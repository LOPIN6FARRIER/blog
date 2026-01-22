export interface TrackInfo {
  titulo: string;
  artista: string;
  album: string;
  imagenPortada: string | null;
  progresoMs: number;
  duracionMs: number;
  lasTimeUpdated?: number;
  url?: string;
  isPlaying?: boolean;
}
