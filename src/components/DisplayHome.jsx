import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AlbumItem from '@/components/AlbumItem';
import SongItem from '@/components/SongItem';
import api from '@/helpers/api.js';

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchAlbums = async () => {
    const response = await api.get('/albums');
    console.log('Albums response:', response.data);
    setAlbums(response.data.result);
  };

  const fetchSongs = async () => {
    const response = await api.get('/songs');
    console.log('Songs response:', response.data);
    setSongs(response.data.result);
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
        <div className="flex overflow-auto">
          { albums.map((item, index) => (
            <AlbumItem key={index} id={item._id} title={item.title} description={item.description} image={item.image} />
          )) }
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top Tracks</h1>
        <div className="flex overflow-auto">
          { songs.map((item, index) => (
            <SongItem key={index} id={item._id} title={item.title} image={item.artist.image} audio={item.audio} />
          )) }
        </div>
      </div>
    </>
  );
};

export default DisplayHome;