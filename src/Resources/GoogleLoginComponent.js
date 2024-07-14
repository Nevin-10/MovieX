import React from 'react';
import '../Styles/loginstyles.css'; // Import your CSS file for styling
import img from './gicon.png';

const GoogleLoginComponent = () => {

  const handleLoginClick = () => {
    window.location.href = 'https://moviez.azurewebsites.net//login';
  };

  return (
    <div className="login-container">
      <div className='containerx'>
      <div className="left-panel">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
          alt="login form"
          className="img-fluid"
        />
      </div>
      <div className="right-panel">
        <button onClick={handleLoginClick} className="google-login-btn">
          <img src={img} alt="Google Icon" className="google-icon" />
          Login with Google
        </button>
      </div>
      </div>
    </div>
  );
};

export default GoogleLoginComponent;
