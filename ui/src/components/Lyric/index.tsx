'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/player';

export default function Lyric() {
  const lyric = usePlayerStore((state) => state.currentSong.lrc);
  const progress = usePlayerStore((state) => state.progress); // 当前播放进度

  const [loading, setLoading] = useState(true);

  const lyrics = lyric.split('\n').map((line) => ({
    time: parseFloat(line.split(']')[0].slice(1)), // 歌词的时间点（从歌词中的时间戳提取）
    text: line.split(']')[1], // 歌词内容
  }));

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, [lyric]);

  // 更新当前歌词
  useEffect(() => {
    if (progress >= lyrics[currentLyricIndex]?.time) {
      setCurrentLyricIndex(currentLyricIndex + 1);
    }
  }, [progress, currentLyricIndex, lyrics]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className='flex justify-center items-center flex-col h-1/2 overflow-hidden'>
      <motion.div
        className='flex flex-col items-center justify-center'
        style={{ height: '100%' }}
        animate={{ y: -(currentLyricIndex * 40) }} // 控制歌词的滚动，40为每行的高度
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
        {lyrics.map((lyric, index) => (
          <motion.div
            key={index}
            className={`text-center ${
              index === currentLyricIndex
                ? 'text-xl font-bold text-white'
                : 'text-sm text-gray-500'
            }`}
            style={{ padding: '10px 0' }}>
            {lyric.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
