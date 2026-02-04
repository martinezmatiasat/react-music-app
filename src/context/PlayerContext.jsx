import { createContext, useEffect, useRef, useState } from 'react';

export const PlayerContext = createContext(null);

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBgRef = useRef(null);
  const seekBarRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minutes: 0, seconds: 0 },
    duration: { minutes: 0, seconds: 0 }
  });

  const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;
  const hasPrevious = currentTrackIndex > 0;
  const hasNext = currentTrackIndex < playlist.length - 1;

  const playTrack = (track) => {
    setPlaylist(prev => {
      const index = prev.findIndex(t => t.id === track.id);

      if (index === -1) {
        setCurrentTrackIndex(prev.length);
        return [...prev, track];
      } else {
        setCurrentTrackIndex(index);
        return prev;
      }
    });
  };

  const playQueue = (tracks, startIndex = 0) => {
    if (!Array.isArray(tracks) || tracks.length === 0) return;
    setPlaylist(tracks);
    setCurrentTrackIndex(startIndex);
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const next = () => {
    setCurrentTrackIndex(prev => prev < playlist.length - 1 ? prev + 1 : prev);
  };

  const previous = () => {
    setCurrentTrackIndex(prev => prev > 0 ? prev - 1 : prev);
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const changeVolume = (e) => {
    const width = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const newVolume = Math.min(Math.max(clickX / width, 0), 1);

    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const seekInSong = (e) => {
    if (!audioRef.current || !seekBgRef.current) return;

    const percent = e.nativeEvent.offsetX / seekBgRef.current.offsetWidth;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  // Reproducir cuando cambia el track
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  // Manejo de repetición
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        return;
      }
      if (hasNext) {
        next();
        return;
      }
      if (repeatMode === 'all') {
        setCurrentTrackIndex(0);
        return;
      }
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, hasNext, next]);

  // Control de volumen
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Actualizar tiempo
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      seekBarRef.current.style.width = `${(audioRef.current.currentTime / audio.duration) * 100}%`;
      setTime({
        currentTime: {
          minutes: Math.floor(audio.currentTime / 60),
          seconds: Math.floor(audio.currentTime % 60)
        },
        duration: {
          minutes: Math.floor(audio.duration / 60),
          seconds: Math.floor(audio.duration % 60)
        }
      });
    };
    
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [currentTrack]);

  const contextValue = {
    audioRef,
    seekBgRef,
    seekBarRef,
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    hasPrevious,
    hasNext,
    repeatMode,
    volume,
    isMuted,
    time,
    play,
    pause,
    playTrack,
    playQueue,
    next,
    previous,
    toggleRepeat,
    changeVolume,
    toggleMute,
    seekInSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      {currentTrack && <audio ref={audioRef} src={currentTrack.audio} preload="auto" />}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
