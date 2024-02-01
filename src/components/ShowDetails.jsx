import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm';

const ShowDetails = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        setShowDetails(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    if (showId) {
      fetchShowDetails();
    }
  }, [showId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };;

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
      <section className="relative md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1">
        <img
          className="xl:max-w-6xl h-full object-cover w-full"
          src={showDetails.image ? showDetails.image.original : 'https://via.placeholder.com/300'}
          alt={showDetails.name}
        />
        <div className="content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5">
          <div className="flex justify-between font-bold text-sm">
            <p>{showDetails.genres.join(', ')}</p>
            <p className="text-gray-400">{showDetails.language}</p>
          </div>
          <h2 className="text-3xl font-semibold mt-4 md:mt-10">{showDetails.name}</h2>
          <div
            className="my-3 text-justify font-medium text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: showDetails.summary }}
          />
          <button
            className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800"
            onClick={openModal}
          >
            Book Now
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal} role="button" tabIndex={0}>
              &times;
            </span>
            {/* Pass onCloseModal function as a prop to BookingForm */}
            <BookingForm showName={showDetails.name} showDetails={showDetails} onCloseModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowDetails;