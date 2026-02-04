import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ album }) => {
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate(`/album/${album._id}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="w-[180px] p-2 px-3 mr-2 bg-[#1a1a1a] rounded cursor-pointer hover:bg-[#ffffff26]"
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