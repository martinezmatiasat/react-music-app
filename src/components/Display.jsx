import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from '@/components/DisplayHome';
import DisplayAlbum from '@/components/DisplayAlbum';

const Display = () => {
  const displayRef = useRef(null);
  const location = useLocation();
  const isAlbumPage = location.pathname.startsWith('/album/');
  
  useEffect(() => {
    if (isAlbumPage) {
      displayRef.current.style.background = `linear-gradient(#007575, #121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  });

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
