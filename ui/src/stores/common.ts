import { create } from 'zustand';

type CommonStore = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export const useCommonStore = create<CommonStore>((set) => ({
  drawerOpen: false,
  setDrawerOpen: (open) => set({ drawerOpen: open }),
}));
