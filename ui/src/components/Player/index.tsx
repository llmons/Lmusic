'use client';

import { usePlayerStore } from '@/stores/player';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type PlayerProps = {
  nameProp: string;
  artistProp: string;
  pictureProp: string;
  urlProp: string;
};

export default function Player({
  nameProp,
  artistProp,
  pictureProp,
  urlProp,
}: PlayerProps) {
  const name = usePlayerStore((state) => state.name);
  const artist = usePlayerStore((state) => state.artist);
  const picture = usePlayerStore((state) => state.picture);
  const url = usePlayerStore((state) => state.url);
  const setName = usePlayerStore((state) => state.setName);
  const setArtist = usePlayerStore((state) => state.setArtist);
  const setPicture = usePlayerStore((state) => state.setPicture);
  const setUrl = usePlayerStore((state) => state.setUrl);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(nameProp);
    setArtist(artistProp);
    setPicture(pictureProp);
    setUrl(urlProp);
    setLoading(false);
  }, [
    nameProp,
    artistProp,
    pictureProp,
    urlProp,
    setArtist,
    setName,
    setPicture,
    setUrl,
  ]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className='flex justify-center items-center'>
      <Image
        src={picture}
        alt='cover'
        width={100}
        height={100}
        className='rounded-full'
      />
      <div className='flex flex-col items-center justify-center'>
        <div>{name}</div>
        <div>{artist}</div>
      </div>
      <audio src={url} controls></audio>
    </div>
  );
}
