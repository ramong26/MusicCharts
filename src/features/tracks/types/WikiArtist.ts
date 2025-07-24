export interface ArtistWiki {
  artistName: string;
  gender?: string;
  nationality?: string;
  birthDate?: { time: string };
  genres?: string[];
  labels?: string[];
  awards?: string[];
}
