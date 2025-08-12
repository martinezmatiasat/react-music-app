import React from 'react';
import Navbar from '@/components/Navbar';
import AlbumItem from '@/components/AlbumItem';
import SongItem from '@/components/SongItem';
import { albumsData, songsData } from '@/assets/assets';

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
        <div className="flex overflow-auto">
          { albumsData.map((item, index) => (
            <AlbumItem key={index} id={item.id} name={item.name} desc={item.desc} image={item.image} />
          )) }
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top Tracks</h1>
        <div className="flex overflow-auto">
          { songsData.map((item, index) => (
            <SongItem key={index} id={item.id} name={item.name} desc={item.desc} image={item.image} />
          )) }
        </div>
      </div>
    </>
  );
};

export default DisplayHome;