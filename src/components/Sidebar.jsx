import { useNavigate } from 'react-router-dom';
import { assets } from '@/assets/assets';
import QueueList from '@/components/QueueList';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] hover:bg-[#ffffff26] h-[15%] rounded flex flex-col justify-around">
        <div onClick={() => navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>
      </div>
      <div className="bg-[#121212] hover:bg-[#ffffff26] h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-bold">Buscar</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="pl-8 py-6">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.queue_icon} alt="" />
            <p className="font-semibold">Lista de reproducción</p>
          </div>
        </div>
        <QueueList />
      </div>
    </div>
  );
};

export default Sidebar;