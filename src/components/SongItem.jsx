import { useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';

const SongItem = ({ song }) => {
  const { playTrack } = useContext(PlayerContext);

  return (
    <div 
      onClick={() => playTrack(song)} 
      className="w-[180px] p-2 px-3 mr-2 bg-[#1a1a1a] rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img 
        className="rounded w-full" 
        src={song.image} 
        alt={song.title} 
      />
      <p className="font-bold mt-3 mb-1">{song.title}</p>
      <p className="text-slate-200 text-sm">{song.artist}</p>
    </div>
  );
};

export default SongItem;