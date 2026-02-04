import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import api from '@/helpers/api.js';
import { formatFilePath, formatDuration, formatDurationText } from '@/helpers/formatters.js';
import { PlayerContext } from '@/context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const { playQueue } = useContext(PlayerContext);

  const fetchAlbumAndSongs = async () => {
    const albumData = await api.get(`/albums/${id}`);

    if (albumData.image) {
      albumData.image = formatFilePath(albumData.image);
    }

    if (albumData.songs) {
      albumData.songs = albumData.songs.map(song => ({
        ...song,
        artist: albumData.artist.name,
        audio: formatFilePath(song.audio),
        image: formatFilePath(albumData.artist.image)
      }));
      albumData.totalDuration = formatDurationText(albumData.songs.reduce((total, song) => total + song.duration, 0));
    }

    setAlbum(albumData);
  }

  useEffect(() => {
    fetchAlbumAndSongs();
  }, []);

  if (!album) return <div>Cargando...</div>;

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={album.image} alt="" />
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.title}</h2>
          <h4>{album.description}</h4>
          <p className="mt-1">
            <b>{album.artist.name}</b> • {album.songs.length} canciones • {album.totalDuration}
          </p>
          <button onClick={() => playQueue(album.songs)}
            className="bg-white font-semibold text-black px-4 py-1.5 rounded-full mt-4 hover:bg-white/80 transition-all duration-300"
          >
            Reproducir
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 pl-2 text-[#a7a7a7]">
        <p><b>#</b></p>
        <p>Título</p>
        <p>Año</p>
        <p>Duración</p>
      </div>
      <hr className="my-3" />
      { album.songs.map((song, index) => (
        <div key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2">
          <p className="text-[15px] hidden sm:block"><b>{index + 1}</b></p>
          <p className="text-[15px] hidden sm:block">{song.title}</p>
          <p className="text-[15px] hidden sm:block">{song.year}</p>
          <p className="text-[15px] hidden sm:block">{formatDuration(song.duration)}</p>
        </div>
      )) }
    </>
  );
};

export default DisplayAlbum;