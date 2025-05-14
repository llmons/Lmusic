'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/player';

export default function Lyric() {
  const rawLyric = usePlayerStore((state) => state.currentSong.lrc);
  const progress = usePlayerStore((state) => state.progress);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const lyric = useMemo(() => {
    if (!rawLyric) return [];

    return rawLyric
      .split('\n')
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (!match) return null;
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        const time = min * 60 + sec;
        const text = match[3].trim();
        return { time, text };
      })
      .filter(Boolean) as { time: number; text: string }[];
  }, [rawLyric]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (!lyric.length) return;

    const index = lyric.findIndex(
      (item, i) =>
        progress >= item.time &&
        (i === lyric.length - 1 || progress < lyric[i + 1].time)
    );

    if (index !== -1 && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [progress, lyric, currentIndex]);

  return (
    <div
      className='overflow-hidden h-[70vh] flex items-start justify-center w-full'
      ref={containerRef}>
      <motion.div
        className='flex flex-col items-center'
        animate={{
          y: containerHeight / 2 - 48 / 2 - currentIndex * 48,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}>
        {lyric.map((item, index) => (
          <div
            key={index}
            className={`h-12 leading-[48px] transition-all duration-300 ${
              index === currentIndex
                ? 'text-black text-2xl font-bold'
                : 'text-gray-400 text-base'
            }`}>
            {item.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
