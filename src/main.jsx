import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from "react-ga4";

// Инициализация Google Analytics
ReactGA.initialize("G-XTP8DD8D03"); // твой ID
ReactGA.send("pageview");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
