import { create } from 'zustand';

import { Album } from '@/shared/types/spotifyTrack';
import { Track } from '@/shared/types/spotifyTrack';

interface TrackStore {
  album: Album | null;
  track: Track | null;
  trackId: string | null;
  setAlbum: (album: Album | null) => void;
  setTrack: (track: Track | null) => void;
  setTrackId: (trackId: string | null) => void;
  clear: () => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
  album: null,
  track: null,
  trackId: null,
  setAlbum: (album) => set({ album }),
  setTrack: (track) => set({ track }),
  setTrackId: (trackId) => set({ trackId }),
  clear: () => set({ album: null, track: null, trackId: null }),
}));
