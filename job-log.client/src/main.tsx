import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { AlertProvider } from './components/AlertProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AlertProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AlertProvider>
  </Provider>
);
