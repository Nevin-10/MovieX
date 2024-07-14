import React, { useState, useEffect } from 'react';
import LanguageSelection from './LanguageSelection';
import ContentDetails from './ContentDetails';
import FavoriteShows from './FavoriteShows';
import '../Styles/Home.css';
import GoogleLoginComponent from './GoogleLoginComponent';

function Home() {
  const [showCards, setShowCards] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [contentDetails, setContentDetails] = useState('');
  const [favoriteShows, setFavoriteShows] = useState('');
  const [step, setStep] = useState(1);
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    // Function to extract code from URL
    const getCodeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      return code;
    };

    const fetchAccessToken = async (code) => {
      try {
        const response = await fetch('https://moviez.azurewebsites.net/main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: code
          })
        });

        const data = await response.json();
        setAccessToken(data);
        setLoginSuccess(true);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const code = getCodeFromUrl();
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  useEffect(() => {
   
    if (accessToken && loginSuccess) {
      const delay = setTimeout(() => {
        setStep(2);
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [accessToken, loginSuccess]);

  useEffect(() => {
    if (loginSuccess) {
      const timeout = setTimeout(() => {
        setLoginSuccess(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [loginSuccess]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setShowCards(false);
    setStep(3);
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setStep(4);
  };

  const handleContentDetailsSubmit = (details) => {
    setContentDetails(details);
    setStep(5);
  };

  const handleFavoriteShowsSubmit = (shows) => {
    setFavoriteShows(shows);
    setStep(6);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);

    const formData = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Recommend some ${selectedType.toLowerCase()} for me, needs to be ${selectedLanguage} ${selectedType.toLowerCase()} ${contentDetails}. My favorite shows are ${favoriteShows}, also print the content of series/movies in a single candidate text, show each show with numbers.give year range only after each movie/show description ends.`
            }
          ]
        }
      ]
    };
  
    try {
      const textData = JSON.stringify(formData);
      const response = await fetch('https://moviez.azurewebsites.net/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: textData
      });
  
      const responseData = await response.json();
      setGeneratedText(responseData);
      setStep(7);
      setLoading(false);
  
    } catch (error) {
      console.error('Error sending formData to API:', error);
      setLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    if (step > 1) {

      if (step === 3) {
        setShowCards(true);
      }
      setStep(step - 1);
      
    }
  };

  // Split generatedText into movie cards
  const movieCards = generatedText.split(/\d+\./).map((item, index) => {
    if (index > 0) { // Skip the first split as it's before the first movie
        const movieDetails = item.split('\n\n').map(detail => detail.replace(/\*\*/g, '').trim());

        const titleAndDescription = movieDetails[0].replace(/\\n/g, ' ').trim();
        const title = titleAndDescription.substring(0, titleAndDescription.indexOf('(')).trim();
        const description = `${titleAndDescription}`;

        return (
            <div key={index} className="movie-card">
                <h2>{index}. {title}</h2>
                <p>{description}</p>
            </div>
        );
    }

    return null;
});


  return (
    <div>
      {step>=3 && (
  <div className="back-button" onClick={handleBackButtonClick}>
    <button>&lt; Back</button>
  </div>
)}


      {step >= 2 && (
        <>
          {showCards ? (
            <div className='parentx'>
              <h1 style={{textAlign:'center',fontFamily:'monospace'}}>
                What are you looking for?
              </h1>
              <br/>
              <br/>
              <div className="card-container">
                <div className="card" onClick={() => handleTypeClick('TV Shows')}>
                  <h2>TV Shows</h2>
                </div>
                <div className="card" onClick={() => handleTypeClick('Movies')}>
                  <h2>Movies</h2>
                </div>
                <div className="card" onClick={() => handleTypeClick('Anime')}>
                  <h2>Anime</h2>
                </div>
              </div>
            </div>
          ) : null}


          {step === 3 && (
            <LanguageSelection onSelectLanguage={handleLanguageSelection} />
          )}

          {step === 4 && (
            <ContentDetails
              type={selectedType}
              language={selectedLanguage}
              onSubmit={handleContentDetailsSubmit}
            />
          )}

          {step === 5 && (
            <FavoriteShows
              type={selectedType}
              language={selectedLanguage}
              contentDetails={contentDetails}
              onNext={handleFavoriteShowsSubmit}
            />
          )}

          {step === 6 && (
            <div className='containerX'>
              <button onClick={handleFinalSubmit} className='next-button'>
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  "FIND SHOWS"
                )}
              </button>
            </div>
          )}

          {step === 7 && (
            <div className="generated-text">
              <hr />
              {movieCards}
            </div>
          )}
        </>
      )}

    {!loginSuccess && step === 1 && <GoogleLoginComponent />}
    </div>
      
  );
}

export default Home;
