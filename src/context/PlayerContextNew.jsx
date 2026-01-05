import { createContext, useState, useRef, useEffect } from 'react';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBgRef = useRef(null);
  const seekBarRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minutes: 0, seconds: 0 },
    duration: { minutes: 0, seconds: 0 }
  });

  // Setea una nueva playlist y reproduce la canción en el índice especificado
  const playPlaylist = (tracks, startIndex = 0) => {
    if (!tracks || tracks.length === 0) return;
    
    setPlaylist(tracks);
    setCurrentTrackIndex(startIndex);
    setCurrentTrack(tracks[startIndex]);
    play();
  };

  // Reproduce una canción específica (la agrega a la playlist si no está)
  const playTrack = (track) => {
    console.log('track', track);
    setCurrentTrack(track);
    // Si la canción no está en la playlist actual, crea una nueva playlist
    const trackIndex = playlist.findIndex(t => t.id === track.id);
    if (trackIndex === -1) {
      setPlaylist([track]);
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrackIndex(trackIndex);
    }
    play();
  };

  // Funciones de control del reproductor
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error al reproducir:", error);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    isPlaying ? pause() : play();
  };

  const next = () => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(playlist[nextIndex]);
    play();
  };

  const previous = () => {
    if (playlist.length === 0) return;
    
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(playlist[prevIndex]);
    play();
  };

  // Manejo de tiempo de reproducción
  const updateTime = () => {
    if (!audioRef.current) return;
    
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    
    setTime({
      currentTime: {
        minutes: Math.floor(currentTime / 60),
        seconds: Math.floor(currentTime % 60)
      },
      duration: {
        minutes: Math.floor(duration / 60),
        seconds: Math.floor(duration % 60)
      }
    });
  };

  // Efecto para manejar el final de la canción
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      next();
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, playlist]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBgRef,
        seekBarRef,
        currentTrack,
        playlist,
        isPlaying,
        time,
        play,
        pause,
        togglePlay,
        next,
        previous,
        playTrack,
        playPlaylist
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;