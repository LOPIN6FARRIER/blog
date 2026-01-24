import { useEffect, useState, useRef } from "react";
import type { TrackInfo } from "../../types/spotify/spotify";

interface SpotifyCardProps {
  track: TrackInfo | null;
}

export default function SpotifyCard({ track }: SpotifyCardProps) {
  // Estado local para el track que realmente mostramos
  const [displayedTrack, setDisplayedTrack] = useState<TrackInfo | null>(track);

  // Estado para animación de fade
  const [visible, setVisible] = useState(true);

  // Progreso actual de la canción (en ms)
  const [progresoActual, setProgresoActual] = useState<number>(
    track?.progresoMs ?? 0,
  );

  // Ref para el intervalo
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determinar si está detenido
  const stopped = track === null || !track.isPlaying;

  // Efecto para animar la barra de progreso cada segundo
  useEffect(() => {
    if (!displayedTrack || stopped) {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
      return;
    }

    // Limpiar intervalo previo
    if (intervaloRef.current) clearInterval(intervaloRef.current);

    // Crear nuevo intervalo que recalcula el progreso cada segundo
    intervaloRef.current = setInterval(() => {
      const elapsed =
        Date.now() - (displayedTrack.lasTimeUpdated || Date.now());
      const nuevoProgreso = Math.min(
        (displayedTrack.progresoMs || 0) + elapsed,
        displayedTrack.duracionMs,
      );
      setProgresoActual(nuevoProgreso);
    }, 1000);

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [displayedTrack, stopped]);

  // Efecto para escuchar cambios en la prop track
  useEffect(() => {
    if (track === null) {
      return;
    }

    // Comprobar si es la misma pista
    const mismaPista =
      displayedTrack !== null &&
      track.titulo === displayedTrack.titulo &&
      track.artista === displayedTrack.artista &&
      track.album === displayedTrack.album;

    // Si está en pausa y es la misma pista, actualizar el estado de pausa
    if (!track.isPlaying && mismaPista) {
      const timeout = setTimeout(() => {
        setDisplayedTrack(track);
      }, 0);
      return () => clearTimeout(timeout);
    }

    // Si está en pausa y no es la misma pista, no hacer nada
    if (!track.isPlaying) {
      return;
    }

    // Si es la misma pista y ahora está playing, actualizar tiempos
    if (mismaPista) {
      const timeout = setTimeout(() => {
        setDisplayedTrack(track);
      }, 0);
      return () => clearTimeout(timeout);
    }

    // Es una pista nueva → fade out y fade in
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 0);

    const fadeInTimeout = setTimeout(() => {
      setDisplayedTrack(track);
      setVisible(true);
    }, 200);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(fadeInTimeout);
    };
  }, [track, displayedTrack]);

  const formatTime = (ms: number) => {
    const totalSegundos = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  };

  if (!displayedTrack) return null;

  // Calcular porcentaje para la barra de progreso

  if (!displayedTrack) return null;

  // Calcular porcentaje para la barra de progreso
  const displayProgress = (progresoActual / displayedTrack.duracionMs) * 100;

  return (
    <div
      className={`col-span-2 relative transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <a
        href={displayedTrack.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
        title="Abrir en Spotify"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <div className="rounded-xl bg-white dark:bg-gray-900 p-4 border border-blue-200 dark:border-gray-900 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0 shadow-lg"
            data-alt={displayedTrack.album || "Album cover"}
            style={{
              backgroundImage: `url('${displayedTrack.imagenPortada || ""}')`,
            }}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight truncate">
              {displayedTrack.titulo}
            </p>
            <p className="text-[#617589] dark:text-gray-400 text-sm font-medium leading-normal truncate">
              {displayedTrack.artista}
              {displayedTrack.album && ` • ${displayedTrack.album}`}
            </p>
          </div>
          {/* <div className="flex shrink-0 items-center justify-center rounded-full size-12 bg-primary text-white shadow-md opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined fill-1 text-2xl">
              {displayedTrack.isPlaying ? "pause" : "play_arrow"}
            </span>
          </div> */}
        </div>
        <div className="mt-4">
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${displayProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[#617589] dark:text-gray-500 text-[10px] font-bold tracking-tighter uppercase">
              {formatTime(progresoActual)}
            </p>
            <p className="text-[#617589] dark:text-gray-500 text-[10px] font-bold tracking-tighter uppercase">
              {formatTime(displayedTrack.duracionMs)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
