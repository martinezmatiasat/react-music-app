import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AlbumItem from '@/components/AlbumItem';
import SongItem from '@/components/SongItem';
import api from '@/helpers/api.js';
const { VITE_API_URL } = import.meta.env;

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchAlbums = async () => {
    const response = await api.get('/albums');
    const processedAlbums = response.data?.result?.map(album => ({
      ...album,
      id: album._id,
      image: album.image ? `${VITE_API_URL}/uploads/${album.image}` : '',
    }));
    setAlbums(processedAlbums);
  };

  const fetchSongs = async () => {
    const response = await api.get('/songs');
    const processedSongs = response.data?.result?.map(song => ({
      ...song,
      id: song._id,
      audio: `${VITE_API_URL}/uploads/${song.audio}`,
      image: song.artist?.image ? `${VITE_API_URL}/uploads/${song.artist.image}` : '',
      artist: song.artist?.name || 'Unknown Artist',
    }));
    setSongs(processedSongs);
  };

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
            <SongItem key={index} song={item} />
          )) }
        </div>
      </div>
    </>
  );
};

export default DisplayHome;