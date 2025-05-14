import { Song } from '@/common/interface';
import { create } from 'zustand';

type PlayerStore = {
  isVIP: boolean;
  isPlaying: boolean;
  shouldAutoPlay: boolean;
  currentSong: Song;
  duration: number;
  progress: number;
  mode: 'loop' | 'random';
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setShouldAutoPlay: (shouldAutoPlay: boolean) => void;
  loadSong: (id: string) => Promise<void>;
  setDuration: (duration: number) => void;
  setProgress: (progress: number) => void;
  setMode: (mode: 'loop' | 'random') => void;
  setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isVIP: false,
  isPlaying: false,
  shouldAutoPlay: false,
  currentSong: {
    name: '',
    artist: '',
    pic: '',
    url: '',
    lrc: '',
  },
  duration: 0,
  progress: 0,
  mode: 'loop',
  volume: 0.7,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setShouldAutoPlay: (shouldAutoPlay) => set({ shouldAutoPlay }),
  loadSong: async (id) => {
    const resp = await fetch(`/api/netease/song/${id}`);
    const song = (await resp.json()) as Song;
    if (song.url === '') set({ currentSong: song, isVIP: true });
    else set({ currentSong: song, isVIP: false });
  },
  setDuration: (duration) => set({ duration }),
  setProgress: (progress) => set({ progress }),
  setMode: (mode) => set({ mode }),
  setVolume: (volume) => set({ volume }),
}));
