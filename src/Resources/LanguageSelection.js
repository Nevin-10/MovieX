import React from 'react';
import '../Styles/LanguageSelection.css';

function LanguageSelection({ onSelectLanguage }) {
  const languages = ['Malayalam', 'English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Arabic'];

  return (
    <div>
      <h2 className="language-heading" style={{fontFamily:'monospace'}}>SELECT LANGUAGE</h2>
      <div className="language-container">
        {languages.map((language, index) => (
          <div key={index} className="language-box" onClick={() => onSelectLanguage(language)}>
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelection;
//Hellooo