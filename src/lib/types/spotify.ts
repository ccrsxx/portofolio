export type Track = {
  trackUrl: string | null;
  trackName: string;
  albumName: string;
  artistName: string;
  albumImageUrl: string | null;
};

export type CurrentlyPlaying = {
  isPlaying: boolean;
  item: Track | null;
};
