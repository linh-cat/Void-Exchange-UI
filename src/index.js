import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'rc-slider/assets/index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
