import { useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
import { formatDuration } from '@/helpers/formatters';

const QueueList = () => {
  const { playlist, currentTrackIndex, playTrack, isPlaying } = useContext(PlayerContext);

  if (!playlist || playlist.length === 0) {
    return (
      <div className="p-4 bg-[#242424] m-2 rounded">
        <p className="text-gray-400 text-center">No hay canciones en la lista</p>
      </div>
    );
  }

  return (
    playlist.map((song, index) => (
      <div 
        key={song.id}
        onClick={() => playTrack(song)}
        className="py-4 px-5 m-2 bg-[#1a1a1a] hover:bg-[#ffffff26] rounded cursor-pointer"
      >
        <div className="max-h-96 overflow-y-auto">
          <div className="flex items-center gap-3 justify-between">
            {index === currentTrackIndex && isPlaying ? (
              <div className="flex items-end gap-1">
                <div 
                  className="w-1 h-2 bg-green-500" 
                  style={{ 
                    transformOrigin: 'bottom',
                    animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                ></div>
                <div 
                  className="w-1 h-4 bg-green-500" 
                  style={{ 
                    transformOrigin: 'bottom',
                    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                ></div>
                <div 
                  className="w-1 h-3 bg-green-500" 
                  style={{ 
                    transformOrigin: 'bottom',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                ></div>
              </div>
            ) : (
              <span className="text-sm">{index + 1}</span>
            )}
            <span className="text-sm text-black">|</span>
            <span className="text-sm">{song.title}</span>
            <span className="text-sm text-black">|</span>
            <span className="text-sm">{song.artist}</span>
            <span className="text-sm text-black">|</span>
            <span className="text-sm">{formatDuration(song.duration)}</span>
          </div>
        </div>
      </div>
    ))
  );
};

export default QueueList;