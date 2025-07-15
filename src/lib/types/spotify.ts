export type Track = {
  trackUrl: string | null;
  trackName: string;
  albumName: string;
  isPlaying: boolean;
  artistName: string;
  albumImageUrl: string | null;
};

export type CurrentlyPlaying = {
  isPlaying: boolean;
  item: Track | null;
};
