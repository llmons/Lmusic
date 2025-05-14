import { SimpleSong } from '@/common/interface';
import { create } from 'zustand';

type PlaylistStore = {
  playlist: SimpleSong[];
  currSongIdx: number;
  setPlaylist: (playlist: SimpleSong[]) => void;
  setCurrSongIdx: (index: number) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
};

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlist: [],
  currSongIdx: 0,
  setPlaylist: (playlist: SimpleSong[]) => set({ playlist }),
  setCurrSongIdx: (index: number) => set({ currSongIdx: index }),
  playNextSong: () =>
    set((state) => ({
      currSongIdx: (state.currSongIdx + 1) % state.playlist.length,
    })),
  playPreviousSong: () =>
    set((state) => ({
      currSongIdx:
        (state.currSongIdx - 1 + state.playlist.length) % state.playlist.length,
    })),
}));
