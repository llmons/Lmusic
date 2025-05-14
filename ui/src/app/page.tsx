import { SimpleSong } from '@/common/interface';
import Lyric from '@/components/Lyric';
import Player from '@/components/Player';
import Playlist from '@/components/Playlist';
import { Drawer } from '@/components/ui/drawer';

export default async function Home() {
  const playlistResp = await fetch(
    'http://localhost:8080/netease/playlist/8803890208',
    {
      cache: 'no-store',
    }
  );
  const playlist = (await playlistResp.json()) as SimpleSong[];

  return (
    <div className='flex justify-center items-center h-screen'>
      <main className='flex container mx-auto items-center justify-center h-full'>
        <Drawer direction='right'>
          <div className='flex items-center justify-center flex-col w-full h-full'>
            <Lyric />
            <Player />
          </div>
          <Playlist playlistProp={playlist} />
        </Drawer>
      </main>
    </div>
  );
}
