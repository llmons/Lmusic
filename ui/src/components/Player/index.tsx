'use client';

import { usePlayerStore } from '@/stores/player';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DrawerTrigger } from '@/components/ui/drawer';
import {
  TrackPreviousIcon,
  TrackNextIcon,
  PlayIcon,
  PauseIcon,
  LoopIcon,
  ShuffleIcon,
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  SpeakerQuietIcon,
  SpeakerOffIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { usePlaylistStore } from '@/stores/playlist';

export default function Player() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const name = usePlayerStore((state) => state.currentSong.name);
  const artist = usePlayerStore((state) => state.currentSong.artist);
  const picture = usePlayerStore((state) => state.currentSong.pic);
  const url = usePlayerStore((state) => state.currentSong.url);
  const duration = usePlayerStore((state) => state.duration);
  const progress = usePlayerStore((state) => state.progress);
  const mode = usePlayerStore((state) => state.mode);
  const volume = usePlayerStore((state) => state.volume);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const loadSong = usePlayerStore((state) => state.loadSong);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setProgress = usePlayerStore((state) => state.setProgress);
  const setMode = usePlayerStore((state) => state.setMode);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const playlist = usePlaylistStore((state) => state.playlist);
  const currentSongIndex = usePlaylistStore((state) => state.currSongIdx);
  const playNextSong = usePlaylistStore((state) => state.playNextSong);
  const playPrevSong = usePlaylistStore((state) => state.playPreviousSong);

  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchSong = async () => {
      await loadSong(playlist[currentSongIndex].id);
    };

    if (playlist.length === 0) {
      setLoading(true);
      return;
    }

    fetchSong().then(() => {
      setLoading(false);
    });
  }, [loadSong, currentSongIndex, playlist]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !url) return;

    audio.src = url;
    audio.load();

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    const onTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };
    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [url, setDuration, setProgress, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audio) audio.pause();
    };
  }, [isPlaying]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <div>Loading...</div>
      </div>
    );

  return (
    <Card>
      <CardContent className='flex justify-center items-center gap-10 w-[60vw]'>
        {/* Track Button */}
        <div className='flex items-center justify-center gap-3'>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => playPrevSong()}>
            <TrackPreviousIcon />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => playNextSong()}>
            <TrackNextIcon />
          </Button>
        </div>

        {/* Music Info */}
        <div className='grow flex flex-col items-center justify-center gap-3'>
          <div className='flex items-center justify-between w-full p-2'>
            <Image
              src={picture}
              alt='cover'
              width={70}
              height={70}
              className='w-[70px] h-[70px] rounded-md object-cover'
            />
            <div className='grow flex flex-col items-center justify-center'>
              <span className='font-bold'>{name}</span>
              <span className='text-sm text-gray-500'>{artist}</span>
            </div>
          </div>
          <Progress value={progress} max={duration} />
          {url && <audio src={url} ref={audioRef}></audio>}
        </div>

        {/* Mode and Volume */}
        <div className=' flex items-center justify-center gap-3'>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => {
              if (mode === 'loop') {
                setMode('random');
              } else {
                setMode('loop');
              }
            }}>
            {mode === 'loop' ? <LoopIcon /> : <ShuffleIcon />}
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => {
              if (volume === 0) {
                setVolume(0.7);
              } else {
                setVolume(0);
              }
            }}>
            {volume === 0 ? (
              <SpeakerOffIcon />
            ) : volume < 0.3 ? (
              <SpeakerQuietIcon />
            ) : volume < 0.7 ? (
              <SpeakerModerateIcon />
            ) : (
              <SpeakerLoudIcon />
            )}
          </Button>
          <DrawerTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='hover:cursor-pointer'
              onClick={() => {
                if (document.activeElement instanceof HTMLButtonElement) {
                  document.activeElement.blur();
                }
              }}>
              <HamburgerMenuIcon />
            </Button>
          </DrawerTrigger>
        </div>
      </CardContent>
    </Card>
  );
}
