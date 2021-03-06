import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';
import { FetchProvider } from './context/FetchContext';
import AppShell from './AppShell';
import Home from './pages/Home';
import FourOFour from './pages/FourOFour';
import logo from './images/logo.png';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const CoursesPage = lazy(() => import('./pages/courses/CoursesPage'));
const Account = lazy(() => import('./pages/Account'));
const ManageCoursePage = lazy(() => import('./pages/courses/ManageCoursePage'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Switch>
      <Route exact path="/">
        {!isAuthenticated ? (
          <Home />
        ) : (
          <AppShell>
            <Dashboard />
          </AppShell>
        )}
      </Route>
      <Route path="*">
        <FourOFour />
      </Route>
    </Switch>
  );
};

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <AppShell>{children}</AppShell> : <Redirect to="/" />
      }
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const { user, isAuthenticated } = useAuth0();
  const roles = user[`${process.env.REACT_APP_JWT_NAMESPACE}/roles`];
  const isAdmin = roles[0] === 'admin' ? true : false;
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && isAdmin ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const LoadingLogo = () => {
  return (
    <div className="self-center">
      <img className="w-32" src={logo} alt="logo" />
    </div>
  );
};

const AppRoutes = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (err) {
        console.log(err);
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AdminRoute path="/inventory">
            <Inventory />
          </AdminRoute>
          <AuthenticatedRoute path="/courses">
            <CoursesPage accessToken={accessToken} />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/course/:slug">
            <ManageCoursePage accessToken={accessToken} />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/course">
            <ManageCoursePage accessToken={accessToken} />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/account">
            <Account />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/settings">
            <Settings />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/users">
            <Users />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
          <Route path="*">
            <FourOFour />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

const requestedScopes = [
  'read:dashboard',
  'read:inventory',
  'write:inventory',
  'edit:inventory',
  'delete:inventory',
  'read:users',
  'read:user',
  'edit:user',
  'create:course',
  'update:course',
  'delete:course',
];

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_APP_AUTH0_CALLBACK}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={requestedScopes.join(' ')}
    >
      <Router>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </Router>
    </Auth0Provider>
  );
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
