import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Auth0Provider
    domain="dev-sw1d7l7t2qqh8vlw.us.auth0.com"
    clientId="fMSoCSIh5zOzm2kmDEfoFAcZEZ4IV5mF"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  </StrictMode>,
)
