import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// project import
import { store } from './store';
import App from './App.jsx';

// apex-chart
import './assets/third-party/apex-chart.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <BrowserRouter basename="">
      <App />
    </BrowserRouter>,
  </ReduxProvider>
);
