import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AlbumItem from '@/components/AlbumItem';
import SongItem from '@/components/SongItem';
import api from '@/helpers/api.js';
import { formatFilePath } from '@/helpers/formatters.js';

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchAlbums = async () => {
    const albumsData = await api.get('/albums');
    const processedAlbums = albumsData.map(album => ({
      ...album,
      id: album._id,
      image: formatFilePath(album.image),
    }));
    setAlbums(processedAlbums);
  };

  const fetchSongs = async () => {
    const songsData = await api.get('/songs');
    const processedSongs = songsData.map(song => ({
      ...song,
      id: song._id,
      audio: formatFilePath(song.audio),
      image: song.artist?.image ? formatFilePath(song.artist.image) : '',
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
        <h1 className="my-5 font-bold text-2xl">Álbumes</h1>
        <div className="flex overflow-auto">
          { albums.map((item, index) => (
            <AlbumItem key={index} album={item} />
          )) }
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Canciones Populares</h1>
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