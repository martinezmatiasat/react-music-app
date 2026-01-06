import { useContext } from 'react';
import { assets } from '@/assets/assets';
import { PlayerContext } from '@/context/PlayerContext';

const Player = () => {
  const { 
    seekBgRef, 
    seekBarRef, 
    currentTrack, 
    isPlaying, 
    play, 
    pause, 
    time, 
    previous, 
    next, 
    hasPrevious, 
    hasNext, 
    repeatMode,
    toggleRepeat,
    seekInSong,
    volume,
    isMuted,
    toggleMute,
    changeVolume
  } = useContext(PlayerContext);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black flex justify-between items-center px-4 pb-2 text-white">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={currentTrack.image} alt="" />
        <div>
          <p>{currentTrack.title}</p>
          <p className="text-xs">{currentTrack.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img onClick={hasPrevious ? previous : undefined} className={`w-4 ${hasPrevious ? 'cursor-pointer' : 'opacity-40'}`} src={assets.prev_icon} alt="" />
          { isPlaying ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="" />
          ) }
          <img onClick={hasNext ? next : undefined} className={`w-4 ${hasNext ? 'cursor-pointer' : 'opacity-40'}`} src={assets.next_icon} alt="" />
          <img onClick={toggleRepeat} className={`w-4 cursor-pointer ${repeatMode !== 'off' ? 'opacity-100' : 'opacity-40'}`} src={repeatMode === 'one' ? assets.loop_icon : assets.loop_list_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minutes}:{time.currentTime.seconds < 10 ? `0${time.currentTime.seconds}` : time.currentTime.seconds}</p>
          <div ref={seekBgRef} onClick={seekInSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBarRef} className="h-1 border-none w-0 bg-green-800 rounded-full" />
          </div>
          <p>{time.duration.minutes}:{time.duration.seconds < 10 ? `0${time.duration.seconds}` : time.duration.seconds}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img onClick={toggleMute} className="w-4 cursor-pointer" src={isMuted ? assets.mute_icon : assets.volume_icon} alt="" />
        <div onClick={changeVolume} className="w-20 bg-slate-50 h-1 rounded cursor-pointer">
          <hr className="h-1 border-none bg-green-800 rounded" style={{ width: `${volume * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Player;