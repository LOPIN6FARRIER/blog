import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SpotifyCard from "../cards/SpotifyCard";
import type { TrackInfo } from "../../types/spotify/spotify";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://data.vinicioesparza-dev.me";
const LAST_TRACK_KEY = "lastSpotifyTrack";

export default function SpotifySocket() {
  const [track, setTrack] = useState<TrackInfo | null>(() => {
    const saved = localStorage.getItem(LAST_TRACK_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Corrupted lastSpotifyTrack in localStorage, clearing.", e);
      localStorage.removeItem(LAST_TRACK_KEY);
      return null;
    }
  });

  useEffect(() => {
    const s = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      randomizationFactor: 0.5,
      timeout: 20000,
    });

    s.on("connect", () => {
      console.log("[Spotify Socket] Conectado con id:", s.id);
      s.emit("joinRoom", "spotify");
    });

    s.on("joined", (roomName: string) => {
      console.log(`[Spotify Socket] Unido al room: ${roomName}`);
    });

    s.on("spotify-current-track", (payload: TrackInfo) => {
      if (!payload.isPlaying) {
        setTrack((prev) => {
          if (!prev) return null;
          const paused = { ...prev, isPlaying: false };
          localStorage.setItem(LAST_TRACK_KEY, JSON.stringify(paused));
          return paused;
        });
      } else {
        setTrack(payload);
        localStorage.setItem(LAST_TRACK_KEY, JSON.stringify(payload));
      }
    });

    s.on("connect_error", (err: Error) => {
      console.warn("[Spotify Socket] Error de conexión:", err.message);
    });

    s.on("reconnect_attempt", (attempt: number) => {
      console.log(`[Spotify Socket] Reintento de reconexión #${attempt}`);
    });

    s.on("disconnect", (reason: string) => {
      console.log("[Spotify Socket] Desconectado, motivo:", reason);
    });

    return () => {
      s.off("connect");
      s.off("joined");
      s.off("spotify-current-track");
      s.off("connect_error");
      s.off("reconnect_attempt");
      s.off("disconnect");
      s.disconnect();
    };
  }, []);

  return <SpotifyCard track={track} />;
}
