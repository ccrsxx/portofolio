import type { Types } from '@prequist/lanyard';

export type Track = {
  trackUrl: string | null;
  trackName: string;
  albumName: string;
  artistName: string;
  timestamps: Types.Spotify['timestamps'];
  albumImageUrl: string | null;
};

export type CurrentlyPlaying = {
  isPlaying: boolean;
  item: Track;
};
