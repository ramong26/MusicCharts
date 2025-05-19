export interface TrackItem {
  track: Track
}

export interface Track {
  album: Album
  artists: Artist[]
  name: string
  id: string
}

export interface Album {
  images: Images[]
}
export interface Images {
  url: string
}

export interface Artist {
  name: string
}
