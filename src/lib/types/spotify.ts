export type FullNowPlaying = {
  item: Item;
  is_local: boolean;
  timestamp: number;
  is_playing: boolean;
  progress_ms: number;
  currently_playing_type: string;
};

export type NowPlaying = NotPlaying | IsPlaying;

export type IsPlaying = {
  trackUrl: string | null;
  trackName: string;
  albumName: string;
  isPlaying: boolean;
  artistName: string;
  albumImageUrl: string | null;
};

type NotPlaying = {
  isPlaying: false;
};

type BaseItem = {
  id: string;
  uri: string;
  name: string;
  type: string;
  href: string;
  external_urls: ExternalUrls;
};

type Image = {
  url: string;
  width: number;
  height: number;
};

type ExternalUrls = {
  spotify: string;
};

type Item = BaseItem & {
  album: Album;
  artists: BaseItem[];
  explicit: boolean;
  is_local: boolean;
  popularity: number;
  preview_url: string;
  track_number: number;
};

type Album = BaseItem & {
  images: Image[];
  artists: BaseItem[];
  album_type: string;
  album_group: string;
  is_playable: boolean;
  release_date: string;
  total_tracks: number;
  available_markets: string[];
  release_date_precision: string;
};
