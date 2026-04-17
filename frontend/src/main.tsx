import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'
import { checkAuthSuccess } from './store/authSlice'
import * as authService from './services/authService'

import { ToastProvider } from './context/ToastContext'

// Check for existing auth session
const currentUser = authService.getCurrentUser();
if (currentUser) {
  store.dispatch(checkAuthSuccess(currentUser));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
