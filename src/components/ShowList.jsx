import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import ContentLoader from "react-content-loader";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
        setOriginalShows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      keys: ["show.name"],
    });

    const result = fuse.search(query);
    setShows(result.map((item) => item.item));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ended":
        return "text-red-500";
      case "Running":
        return "text-green-500";
      case "In Development":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const SkeletonLoader = () => (
    <ContentLoader
      speed={2}
      width={300}
      height={400}
      viewBox="0 0 300 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="10" rx="5" ry="5" width="280" height="180" />
      <rect x="10" y="200" rx="5" ry="5" width="280" height="20" />
      <rect x="10" y="230" rx="5" ry="5" width="140" height="20" />
      <rect x="160" y="230" rx="5" ry="5" width="130" height="20" />
    </ContentLoader>
  );

  return (
    <div className="relative">
      <input
        className="input fixed top-0 right-3 m-4 px-2 py-1 "
        name="search"
        placeholder="Search..."
        type="search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          searchShows(e.target.value);
        }}
      />

      <div className="p-1 sm:flex sm:flex-wrap items-center justify-center mt-20">
        {shows.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 m-6">
                <SkeletonLoader />
              </div>
            ))
          : shows.map((show) => (
              <div
                key={show.show.id}
                className={`flex-shrink-0 m-6 relative overflow-hidden bg-${show.show.genres[0].toLowerCase()}-500 rounded-lg max-w-xs shadow-lg group`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Link to={`/show/${show.show.id}`}>
                    <img
                      className="w-full h-full object-cover"
                      src={
                        show.show.image && show.show.image.medium
                          ? show.show.image.medium
                          : "https://via.placeholder.com/200X300"
                      }
                      alt={show.show.name || "Show Image"}
                    />

                    <div className="absolute bottom-0 left-0 p-2 text-white text-left bg-opacity-50 backdrop-blur-lg w-full">
                      <span
                        className={`block font-bold ${getStatusColor(
                          show.show.status
                        )} opacity-75 -mb-1`}
                      >
                        {show.show.status}
                      </span>

                      <div className="flex justify-between">
                        <span className="block font-semibold text-xl">
                          {show.show.name}
                        </span>
                        <span
                          className={`block rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center bg-opacity-50 backdrop-blur-lg`}
                        >
                          ⭐ {show.show.rating.average}
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
