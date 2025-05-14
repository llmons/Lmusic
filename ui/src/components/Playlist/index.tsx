'use client';

import { SimpleSong } from '@/common/interface';
import { usePlaylistStore } from '@/stores/playlist';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCommonStore } from '@/stores/common';

type PlaylistProps = {
  playlistProp: SimpleSong[];
};

export default function Playlist({ playlistProp }: PlaylistProps) {
  const playlist = usePlaylistStore((state) => state.playlist);
  const currSongIdx = usePlaylistStore((state) => state.currSongIdx);
  const setPlalist = usePlaylistStore((state) => state.setPlaylist);
  const setCurrSongIdx = usePlaylistStore((state) => state.setCurrSongIdx);

  const drawerOpen = useCommonStore((state) => state.drawerOpen);

  const [loading, setLoading] = useState(true);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlalist(playlistProp);
    setLoading(false);
  }, [playlistProp, setPlalist]);

  useEffect(() => {
    if (!drawerOpen) return;

    const timeout = setTimeout(() => {
      if (currentRef.current) {
        currentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [currSongIdx, drawerOpen]);

  if (loading) return <div className='flex justify-center items-center'></div>;

  return (
    <div className='flex flex-col items-center justify-center'>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>播放列表{drawerOpen ? 1 : 0}</DrawerTitle>
            <DrawerDescription className='sr-only'>播放列表</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <ScrollArea className='h-[90vh]'>
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between w-full p-2 '>
                  <div
                    ref={(el) => {
                      if (index === currSongIdx) currentRef.current = el;
                    }}
                    className={
                      index === currSongIdx
                        ? 'flex items-center gap-3 w-[90%] p-2 rounded-md bg-gray-200 hover:cursor-pointer'
                        : 'flex items-center gap-3 w-[90%] p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer'
                    }
                    onClick={() => {
                      setCurrSongIdx(index);
                    }}>
                    <Image
                      src={song.picurl}
                      alt='cover'
                      width={50}
                      height={50}
                      className='w-[50px] h-[50px] rounded-md object-cover'
                    />
                    <div className='flex flex-col ml-2'>
                      <span className='font-bold'>{song.name}</span>
                      <span className='text-sm text-gray-500'>
                        {song.artist}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </div>
  );
}
