
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/AuthContext.jsx';

import App from './App.jsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css"; 

// Create root first for better error handling
const container = document.getElementById('root');
const root = createRoot(container);

// Configure toast defaults
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
 
root.render(
  <StrictMode>
    <BrowserRouter>
      {/* App must be wrapped with context providers here if any */}
      <AuthContextProvider>
      <App />
      <ToastContainer {...toastConfig}
     />
     
     </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);

// Error boundary for mounting errors
if (!container) {
  console.error('Failed to find the root element');
  document.body.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h2>Critical Error</h2>
      <p>Could not find root element. Please refresh the page.</p>
    </div>
  `;
}