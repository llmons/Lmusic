import { Song } from '@/common/interface';
import { create } from 'zustand';

type PlayerStore = {
  isPlaying: boolean;
  currentSong: Song;
  duration: number;
  progress: number;
  mode: 'loop' | 'random';
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  loadSong: (id: string) => Promise<void>;
  setDuration: (duration: number) => void;
  setProgress: (progress: number) => void;
  setMode: (mode: 'loop' | 'random') => void;
  setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentSong: {
    name: '',
    artist: '',
    pic: '',
    url: '',
    lrc: '',
  },
  duration: 100,
  progress: 0,
  mode: 'loop',
  volume: 0.7,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  loadSong: async (id) => {
    const resp = await fetch(`/api/netease/song/${id}`);
    const song = (await resp.json()) as Song;
    set({ currentSong: song });
  },
  setDuration: (duration) => set({ duration }),
  setProgress: (progress) => set({ progress }),
  setMode: (mode) => set({ mode }),
  setVolume: (volume) => set({ volume }),
}));
