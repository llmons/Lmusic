import { create } from 'zustand';

type PlayerStore = {
  isPlaying: boolean;
  name: string;
  artist: string;
  picture: string;
  url: string;
  lyric: string;
  setIsPlaying: (isPlaying: boolean) => void;
  setName: (name: string) => void;
  setArtist: (artist: string) => void;
  setPicture: (picture: string) => void;
  setUrl: (url: string) => void;
  setLyric: (lyric: string) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  name: '',
  artist: '',
  picture: '',
  url: '',
  lyric: '',
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setName: (name) => set({ name }),
  setArtist: (artist) => set({ artist }),
  setPicture: (picture) => set({ picture }),
  setUrl: (url) => set({ url }),
  setLyric: (lyric) => set({ lyric }),
}));
