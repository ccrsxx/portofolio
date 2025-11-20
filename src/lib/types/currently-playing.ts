export type Platform = 'spotify' | 'jellyfin';

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
  item: Track;
  platform: Platform;
  isPlaying: boolean;
};
