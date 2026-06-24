import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import contentJson from "../webedit/content.json";
const content = contentJson;
createRoot(document.getElementById('root')).render(<StrictMode>
    <App />
  </StrictMode>);