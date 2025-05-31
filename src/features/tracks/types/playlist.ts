export interface TrackItem {
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  name: string;
  id: string;
}
export interface Artist {
  name: string;
}
export interface Album {
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
  tracks: {
    items: TrackId[];
  };
}
export interface Images {
  url: string;
}

export interface TrackId {
  artists: Artist[];
  name: string;
  id: string;
}
