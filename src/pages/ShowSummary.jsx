// src/components/ShowSummary.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm'; // Import the BookingForm component

const ShowSummary = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);

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

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{showDetails.name}</h1>
      <img src={showDetails.image ? showDetails.image.original : 'https://via.placeholder.com/300'} alt={showDetails.name} />
      <p><strong>Language:</strong> {showDetails.language}</p>
      <p><strong>Genres:</strong> {showDetails.genres.join(', ')}</p>
      <p><strong>Status:</strong> {showDetails.status}</p>
      <p><strong>Average Rating:</strong> {showDetails.rating.average}</p>
      <p><strong>Summary:</strong> {showDetails.summary}</p>

      {/* Button to navigate to the booking form page */}
      <Link to={`/booking/${showId}`}>
        <button>Book Tickets</button>
      </Link>

      {/* Include the BookingForm component */}
      <BookingForm showName={showDetails.name} showDetails={showDetails} />
    </div>
  );
};

export default ShowSummary;
