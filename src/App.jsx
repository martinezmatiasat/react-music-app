import { useContext } from 'react';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import Display from '@/components/Display';
import { PlayerContext } from '@/context/PlayerContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { currentTrack } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black relative">
      <div className={`flex h-full ${currentTrack ? 'pb-16' : ''}`}>
        <Sidebar />
        <Display />
      </div>

      {currentTrack && <Player />}
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
