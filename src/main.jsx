import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  initGoogleAnalytics,
  installScrollDepthTracking,
} from './lib/analytics.js'
import './index.css'

initGoogleAnalytics()
installScrollDepthTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
