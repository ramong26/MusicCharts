import { Album, Artist } from '@/shared/types/SpotifyTrack';

export interface WikipediaResponse {
  title: string | null;
  description: string | null;
  url: string | null;
  found: boolean;
}

export default async function getAlbumDescription(
  album: Album,
  artists: Artist[]
): Promise<WikipediaResponse> {
  try {
    // Create search queries with different combinations
    const artistNames = artists.map(artist => artist.name).join(' ');
    const queries = [
      `${album.name} ${artistNames} album`,
      `${album.name} album`,
      `${album.name} ${artistNames}`,
    ];

    // Try each query until we find a result
    for (const query of queries) {
      const response = await fetch(`/api/wikipedia?query=${encodeURIComponent(query)}`);
      
      if (response.ok) {
        const data: WikipediaResponse = await response.json();
        if (data.found && data.description) {
          return data;
        }
      }
    }

    // If no results found, return empty response
    return {
      title: null,
      description: null,
      url: null,
      found: false,
    };
  } catch (error) {
    console.error('Error fetching album description:', error);
    return {
      title: null,
      description: null,
      url: null,
      found: false,
    };
  }
}