import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets, albumsData, songsData } from '@/assets/assets';

const DisplayAlbum = () => {
  const { id } = useParams();
  const album = albumsData.find((item) => item.id === parseInt(id));
  const songs = songsData.filter((item) => item.albumId === parseInt(id));

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={album.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src="../../public/react.svg" alt="" />
            <b> React Music App</b> • 1.236 likes • 50 songs • about 2 h 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      { songs.map((song, index) => (
        <div key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center">
          <p>
            <b className="mr-4">{index + 1}</b>
            <img className="inline w-10 mr-5" src={song.image} alt="" />
            {song.name}
          </p>
          <p className="text-[15px]">{album.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] hidden sm:block">{song.duration}</p>
        </div>
      )) }
    </>
  );
};

export default DisplayAlbum;