'use client';

import { SimpleSong } from '@/common/interface';
import { usePlaylistStore } from '@/stores/playlist';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type PlaylistProps = {
  playlistProp: SimpleSong[];
};

export default function Playlist({ playlistProp }: PlaylistProps) {
  const playlist = usePlaylistStore((state) => state.playlist);
  const setPlalist = usePlaylistStore((state) => state.setPlaylist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPlalist(playlistProp);
    setLoading(false);
  }, [playlistProp, setPlalist]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className='flex flex-col items-center justify-center'>
      {playlist.map((song, index) => (
        <div
          key={index}
          className='flex items-center justify-between w-full p-2'>
          <div className='flex items-center'>
            <Image
              src={song.picurl}
              alt='cover'
              width={50}
              height={50}
              className='rounded-full'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-bold'>{song.name}</span>
              <span className='text-sm text-gray-500'>{song.artist}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
