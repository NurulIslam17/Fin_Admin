import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfirmModalProvider } from './context/ConfirmModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfirmModalProvider>
      <App />
    </ConfirmModalProvider>
  </StrictMode>,
)
