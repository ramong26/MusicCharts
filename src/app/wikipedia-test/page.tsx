'use client';

import TrackDescription from '@/features/tracks/components/TrackDescription';
import { Album, Artist } from '@/shared/types/SpotifyTrack';

// Mock data for testing Wikipedia API integration
const mockAlbum: Album = {
  external_urls: {
    spotify: 'https://open.spotify.com/album/test',
  },
  id: 'test-album-id',
  images: [
    {
      url: 'https://via.placeholder.com/400x400.png?text=Album+Cover',
    },
  ],
  name: 'Abbey Road',
  release_date: '1969-09-26',
  total_tracks: 17,
  type: 'album',
  tracks: {
    items: [],
  },
};

const mockArtists: Artist[] = [
  { name: 'The Beatles' },
];

export default function WikipediaTestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Wikipedia API Integration Test</h1>
      <div className="max-w-4xl">
        <TrackDescription album={mockAlbum} artists={mockArtists} />
      </div>
    </div>
  );
}