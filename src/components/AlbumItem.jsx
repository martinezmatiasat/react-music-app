import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const AlbumItem = ({ album }) => {
  const { playQueue } = useContext(PlayerContext);

  return (
    <div 
      onClick={() => playQueue([album])} 
      className="w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img 
        className="rounded w-full" 
        src={album.image} 
        alt={album.title} 
      />
      <p className="font-bold mt-3 mb-1">{album.title}</p>
      <p className="text-slate-200 text-sm">{album.description}</p>
    </div>
  );
};

export default AlbumItem;