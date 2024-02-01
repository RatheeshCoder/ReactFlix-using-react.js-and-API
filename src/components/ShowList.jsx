// src/components/ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Fuse from 'fuse.js';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
        setOriginalShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const searchShows = (query) => {
    if (!query) {
      setShows(originalShows);
      return;
    }

    const fuse = new Fuse(originalShows, {
      keys: ['show.name'],
    });

    const result = fuse.search(query);
    setShows(result.map((item) => item.item));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ended':
        return 'text-red-500'; // Set the color for 'Ended' status to red
      case 'Running':
        return 'text-green-500'; // Set the color for 'Running' status to green
      case 'In Development':
        return 'text-yellow-500'; // Set the color for 'In Development' status to yellow
      default:
        return 'text-gray-500'; // Default color for other statuses
    }
  };
  

  return (
    <div className="relative">
      <input
        className="input fixed top-0 right-0 m-4 px-2 py-1"
        name="search"
        placeholder="Search..."
        type="search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          searchShows(e.target.value);
        }}
      />

      <div className="p-1 flex flex-wrap items-center justify-center mt-20">
        {shows.map((show) => (
          <div key={show.show.id} className={`flex-shrink-0 m-6 relative overflow-hidden bg-${show.show.genres[0].toLowerCase()}-500 rounded-lg max-w-xs shadow-lg group`}>
            <svg
              className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
              viewBox="0 0 375 283"
              fill="none"
              style={{ opacity: 0.1 }}
            >
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
            </svg>
            <div className="relative w-full h-full overflow-hidden">
              <Link to={`/show/${show.show.id}`}>
                <img className="w-full h-full object-cover" src={show.show.image ? show.show.image.medium : 'https://via.placeholder.com/100'} alt={show.show.name} />
                <div className="absolute bottom-0 left-0 p-2 text-white text-left bg-opacity-50 backdrop-blur-lg w-full">
                <span className={`block font-bold ${getStatusColor(show.show.status)} opacity-75 -mb-1`}>{show.show.status}</span>

                  <div className="flex justify-between">
                    <span className="block font-semibold text-xl">{show.show.name}</span>
                    <span className={`block rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center bg-opacity-50 backdrop-blur-lg`}>
                      {show.show.rating.average}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
