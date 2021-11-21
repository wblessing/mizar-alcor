import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GradientLink from '../components/common/GradientLink';
import GradientButton from '../components/common/buttons/GradientButton';
import GradientBar from './../components/common/GradientBar';
import skyImage from './../images/botha-unsplash.jpg';
import logo from './../images/logo.png';

const HomeView = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const onClick = async () => {
    window.open('https://github.com/wblessing/mizar-alcor', 'github-source');
  };

  return (
    <>
      <GradientBar />
      <div className="w-full top-0 bg-white px-10 py-5">
        <div className="flex justify-between">
          <img className="w-32 h-full" src={logo} alt="Logo" />
          <div className="flex items-center">
            {isAuthenticated ? (
              <GradientLink to="/dashboard" text="Go to Dashboard" />
            ) : (
              <GradientButton onClick={loginWithRedirect} text="Log In" />
            )}
          </div>
        </div>
      </div>
      <div className="h-full bg-blue-900">
        <div className="opacity-10">
          <img src={skyImage} alt="Home" />
        </div>
        <div className="absolute left-0 top-0 mt-32 lg:mt-48 px-12 nato-sans">
          <div className="w-full lg:w-2/3">
            <h1 className="text-gray-200 text-2xl lg:text-6xl sm:text-5xl font-bold leading-tight">
              React Redux Axios and Security
            </h1>
            <h2 className="text-gray-400 text-md sm:text-2xl sm:mt-10 mt-4">
              Auth0, Netlify, Mongo and Webpack
            </h2>
            <div className="mt-4">
              <GradientButton onClick={onClick} text="Github Source" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
