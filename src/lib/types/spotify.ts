export type Track = {
  trackUrl: string | null;
  trackName: string;
  albumName: string;
  artistName: string;
  progressMs: number;
  durationMs: number;
  albumImageUrl: string | null;
};

export type CurrentlyPlaying = {
  isPlaying: boolean;
  item: Track;
};
