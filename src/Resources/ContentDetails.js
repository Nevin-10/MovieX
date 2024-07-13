import React from 'react';
import '../Styles/ContentDetails.css'

function ContentDetails({ type, language, onSubmit }) {

  const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];

  const handleGenreClick = (genre) => {
    onSubmit(genre);
  };

  return (
    <div className="content-details-container">
      <h2 style={{fontFamily:'monospace',fontSize:'2em'}}>Please choose the {type} Genre you like:</h2>
      <div className="genre-container">
        {genres.map((genre, index) => (
          <div key={index} className="genre-card" onClick={() => handleGenreClick(genre)}>
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentDetails;
