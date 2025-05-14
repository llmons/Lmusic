import { SimpleSong } from '@/common/interface';
import { create } from 'zustand';

type PlaylistStore = {
  playlist: SimpleSong[];
  setPlaylist: (playlist: SimpleSong[]) => void;
};

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlist: [],
  setPlaylist: (playlist: SimpleSong[]) => set({ playlist }),
}));
