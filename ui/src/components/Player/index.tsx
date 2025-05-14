'use client';

import { usePlayerStore } from '@/stores/player';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DrawerTrigger } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
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
  ReloadIcon,
} from '@radix-ui/react-icons';
import { usePlaylistStore } from '@/stores/playlist';

export default function Player() {
  const isVIP = usePlayerStore((state) => state.isVIP);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shouldAutoPlay = usePlayerStore((state) => state.shouldAutoPlay);
  const name = usePlayerStore((state) => state.currentSong.name);
  const artist = usePlayerStore((state) => state.currentSong.artist);
  const picture = usePlayerStore((state) => state.currentSong.pic);
  const url = usePlayerStore((state) => state.currentSong.url);
  const duration = usePlayerStore((state) => state.duration);
  const progress = usePlayerStore((state) => state.progress);
  const mode = usePlayerStore((state) => state.mode);
  const volume = usePlayerStore((state) => state.volume);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const setShouldAutoPlay = usePlayerStore((state) => state.setShouldAutoPlay);
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

  // load music
  useEffect(() => {
    const fetchSong = async () => {
      await loadSong(playlist[currentSongIndex].id);
    };

    if (playlist.length === 0) {
      return;
    }

    fetchSong().then(() => {
      setLoading(false);
    });
  }, [loadSong, currentSongIndex, playlist, setIsPlaying]);

  // switch music
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !url) return;

    audio.src = url;
    audio.load();

    const onLoadedMetadata = () => {
      if (shouldAutoPlay) audio.play();
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
  }, [url, setDuration, setProgress, setIsPlaying, shouldAutoPlay]);

  // play/pause music
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (isVIP) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isVIP, setIsPlaying, setProgress]);

  if (loading)
    return (
      <div className='flex justify-center items-center'>
        <ReloadIcon className='animate-spin' />
      </div>
    );

  return (
    <Card className='fixed bottom-10 z-50 bg-white shadow-lg rounded-t-lg'>
      <Badge
        variant='destructive'
        className='absolute top-5 right-5'
        hidden={!isVIP}>
        VIP
      </Badge>
      <CardContent className='flex justify-center items-center gap-10 w-[60vw]'>
        {/* Track Button */}
        <div className='flex items-center justify-center gap-3'>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => {
              playPrevSong();
              setShouldAutoPlay(isPlaying);
            }}>
            <TrackPreviousIcon />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            disabled={isVIP}
            onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hover:cursor-pointer'
            onClick={() => {
              playNextSong();
              setShouldAutoPlay(isPlaying);
            }}>
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
          <Progress value={Math.min((progress / duration) * 100, 100)} />
          <span className='hidden'>
            {progress}/{duration}
          </span>
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
