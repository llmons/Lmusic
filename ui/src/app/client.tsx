'use client';
import { SimpleSong } from '@/common/interface';
import Lyric from '@/components/Lyric';
import Player from '@/components/Player';
import Playlist from '@/components/Playlist';
import { Drawer } from '@/components/ui/drawer';
import { useCommonStore } from '@/stores/common';

type ClientProps = {
  playlist: SimpleSong[];
};

export default function Client({ playlist }: ClientProps) {
  const drawerOpen = useCommonStore((state) => state.drawerOpen);
  const setDrawerOpen = useCommonStore((state) => state.setDrawerOpen);

  return (
    <main className='flex container mx-auto items-center justify-center h-full'>
      <Drawer direction='right' open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Lyric />
        <Player />
        <Playlist playlistProp={playlist} />
      </Drawer>
    </main>
  );
}
