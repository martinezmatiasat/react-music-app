import { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBgRef = useRef(null);
  const seekBarRef = useRef(null);

  const [track, setTrack] = useState(songsData[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      minutes: 0,
      seconds: 0
    },
    duration: {
      minutes: 0,
      seconds: 0
    }
  });

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const previous = () => {
    if (track.id > 0) {
      playWithId(track.id - 1);
    }
  };

  const next = () => {
    if (track.id < songsData.length - 1) {
      playWithId(track.id + 1);
    }
  };

  const seekInSong = async (e) => {
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBgRef.current.offsetWidth) * audioRef.current.duration;
    console.log(e);
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBarRef.current.style.width = `${Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)}%`;
        setTime({
          currentTime: {
            minutes: Math.floor(audioRef.current.currentTime / 60),
            seconds: Math.floor(audioRef.current.currentTime % 60)
          },
          duration: {
            minutes: Math.floor(audioRef.current.duration / 60),
            seconds: Math.floor(audioRef.current.duration % 60)
          }
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBgRef,
    seekBarRef,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekInSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
