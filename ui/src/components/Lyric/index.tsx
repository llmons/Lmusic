'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/player';

export default function Lyric() {
  const lyric = usePlayerStore((state) => state.currentSong.lrc);
  const progress = usePlayerStore((state) => state.progress);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 解析歌词为 [{ time, text }]
  const lyrics = useMemo(() => {
    if (!lyric) return [];

    return lyric
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
  }, [lyric]);

  // 根据进度设置当前歌词索引
  useEffect(() => {
    if (!lyrics.length) return;

    const index = lyrics.findIndex(
      (item, i) =>
        progress >= item.time &&
        (i === lyrics.length - 1 || progress < lyrics[i + 1].time)
    );

    if (index !== -1 && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [progress, lyrics, currentIndex]);

  if (!lyrics.length) {
    return (
      <div className='flex justify-center items-center h-[50vh] text-gray-400'></div>
    );
  }

  return (
    <div
      className='relative overflow-hidden h-[50vh] flex items-center justify-center'
      ref={containerRef}>
      <motion.div
        className='flex flex-col items-center'
        animate={{ y: -currentIndex * 48 }} // 每行高度
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}>
        {lyrics.map((item, index) => (
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
