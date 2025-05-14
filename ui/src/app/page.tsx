import { Song } from '@/common/interface';
import Player from './client';

export default async function Home() {
  const resp = await fetch('http://localhost:8080/netease/song/25638273', {
    cache: 'no-store',
  });
  const data = (await resp.json()) as Song;

  return <Player song={data} />;
}
