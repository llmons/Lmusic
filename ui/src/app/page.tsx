import { SimpleSong, Song } from '@/common/interface';
import Lyric from '@/components/Lyric';
import Player from '@/components/Player';
import Playlist from '@/components/Playlist';

export default async function Home() {
  const songResp = await fetch('http://localhost:8080/netease/song/25638273', {
    cache: 'no-store',
  });
  const song = (await songResp.json()) as Song;

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
        <div className='flex items-center justify-center flex-col w-full h-full'>
          <Lyric lyricProp={song.lrc} />
          <Player
            nameProp={song.name}
            artistProp={song.artist}
            pictureProp={song.pic}
            urlProp={song.url}
          />
        </div>
        <Playlist playlistProp={playlist} />
      </main>
    </div>
  );
}
