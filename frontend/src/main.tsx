import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientID: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0CallbackURL: string = import.meta.env.VITE_AUTH0_CALLBACK_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientID}
      authorizationParams={{
        redirect_uri: auth0CallbackURL,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
