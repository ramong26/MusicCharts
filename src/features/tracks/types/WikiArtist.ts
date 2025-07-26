export interface ArtistWiki {
  artistName: string;
  gender?: string;
  nationality?: string;
  birthDate?: { time: string };
  genres?: (string | undefined)[];
  labels?: (string | undefined)[];
  awards?: (string | undefined)[];
}
