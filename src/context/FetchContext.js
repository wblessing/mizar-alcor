import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const { getAccessTokenSilently } = useAuth0();

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });

      setAccessToken(token);
    } catch (err) {
      console.log(err);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_SERVERLESS_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401) {
        getAccessToken();
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FetchContext, FetchProvider };
