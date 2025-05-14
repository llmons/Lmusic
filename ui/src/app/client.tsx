'use client';

import { usePlayerStore } from '@/stores/player';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Song } from '@/common/interface';

export default function Player({ song }: { song: Song }) {
  const name = usePlayerStore((state) => state.name);
  const artist = usePlayerStore((state) => state.artist);
  const picture = usePlayerStore((state) => state.picture);
  const url = usePlayerStore((state) => state.url);
  const lyric = usePlayerStore((state) => state.lyric);
  const setName = usePlayerStore((state) => state.setName);
  const setArtist = usePlayerStore((state) => state.setArtist);
  const setPicture = usePlayerStore((state) => state.setPicture);
  const setUrl = usePlayerStore((state) => state.setUrl);
  const setLyric = usePlayerStore((state) => state.setLyric);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(song.name);
    setArtist(song.artist);
    setPicture(song.pic);
    setUrl(song.url);
    setLyric(song.lrc);
    setLoading(false);
  }, [
    song.artist,
    song.lrc,
    song.name,
    song.pic,
    song.url,
    setArtist,
    setLyric,
    setName,
    setPicture,
    setUrl,
  ]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <main className='flex container mx-auto flex-col items-center justify-center'>
          <div>Loading...</div>
        </main>
      </div>
    );

  return (
    <div className='flex justify-center items-center h-screen'>
      <main className='flex container mx-auto flex-col items-center justify-center'>
        <div>{name}</div>
        <div>{artist}</div>
        <Image src={picture} alt='cover' width={300} height={300} />
        <audio src={url} controls></audio>
        <div>{lyric}</div>
      </main>
    </div>
  );
}
