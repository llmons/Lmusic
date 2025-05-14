import { SimpleSong } from '@/common/interface';
import Client from './client';

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
      <Client playlist={playlist} />
    </div>
  );
}
