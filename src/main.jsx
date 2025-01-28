import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: 
          import.meta.env.DEV 
            ? 'http://localhost:5173/api/auth/callback' 
            : 'https://kanban-board.vercel.app/api/auth/callback'
      }}
      logoutParams={{
        returnTo: 
          import.meta.env.DEV 
            ? 'http://localhost:5173' 
            : 'https://kanban-board.vercel.app'
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)