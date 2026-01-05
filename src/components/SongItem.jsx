import { useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
const { VITE_API_URL } = import.meta.env;

const SongItem = ({ id, title, image, audio }) => {
  const { playTrack } = useContext(PlayerContext);
  const audioUrl = VITE_API_URL + '/uploads/' + audio;

  return (
    <div 
      onClick={() => playTrack({ id, title, image, audioUrl })} 
      className="text-white px-4 py-2 hover:bg-white/[0.1] rounded-lg cursor-pointer"
    >
      <div className="relative">
        <img className="rounded" src={image} alt="" />
        <p className="font-semibold mt-2 mb-1">{title}</p>
        <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default SongItem;