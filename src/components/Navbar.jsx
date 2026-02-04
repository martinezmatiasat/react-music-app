import { assets } from '@/assets/assets';
import { useNavigate } from 'react-router-dom';
import { notifyDevelopment } from '@/helpers/notification';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img onClick={() => navigate(-1)} 
            className="w-8 bg-black p-2 rounded-2x1 cursor-pointer hover:bg-white/20" 
            src={assets.arrow_left} 
            alt="Back" />
          <img onClick={() => navigate(1)} 
            className="w-8 bg-black p-2 rounded-2x1 cursor-pointer hover:bg-white/20" 
            src={assets.arrow_right} 
            alt="Forward" />
        </div>
        <div className="flex items-center gap-4">
          <p onClick={() => notifyDevelopment()} 
            className="bg-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-white/20">
            Explorar premium
          </p>
          <p onClick={() => notifyDevelopment()} className="bg-black text-[15px] px-3 py-1 rounded-2xl cursor-pointer hover:bg-white/20">
            Instalar app
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            U
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p onClick={() => notifyDevelopment()} className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-white/80">
          Todo
        </p>
        <p onClick={() => notifyDevelopment()} className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-white/80">
          Música
        </p>
        <p onClick={() => notifyDevelopment()} className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-white/80">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;