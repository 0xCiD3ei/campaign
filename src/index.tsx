import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CampaignProvider} from "./contexts/CampaignContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CampaignProvider>
    <App />
  </CampaignProvider>
);
