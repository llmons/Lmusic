'use client';

import { usePlayerStore } from '@/stores/player';
import { useEffect, useState } from 'react';

type LyricProps = {
  lyricProp: string;
};

export default function Lyric({ lyricProp }: LyricProps) {
  const lyric = usePlayerStore((state) => state.lyric);
  const setLyric = usePlayerStore((state) => state.setLyric);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLyric(lyricProp);
    setLoading(false);
  }, [lyricProp, setLyric]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className='flex justify-center items-center flex-col h-1/2 overflow-hidden'>
      {lyric.split('\n').map((line, index) => (
        <span key={index} className='text-center'>
          {line}
        </span>
      ))}
    </div>
  );
}
