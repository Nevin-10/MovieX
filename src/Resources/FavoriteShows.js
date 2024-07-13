// FavoriteShows.js
import React, { useState } from 'react';
import '../Styles/FavoriteShows.css'

function FavoriteShows({ type, language, contentDetails, onNext }) {
  const [favoriteShows, setFavoriteShows] = useState('');
  
  const handleInputChange = (event) => {
    setFavoriteShows(event.target.value);
  };

  const handleNextClick = () => {
    // Perform search or any other final action here
    onNext(favoriteShows);
  };

  return (
    <div className="favorite-shows-container">
      <h2>Enter your favorite {type}:</h2>
      <textarea value={favoriteShows} onChange={handleInputChange} />
      <br />
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default FavoriteShows;
