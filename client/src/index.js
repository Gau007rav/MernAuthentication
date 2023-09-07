import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CommonState from './components/stateprovider/CommonState';
import {BrowserRouter} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CommonState>
    <BrowserRouter >
    <App />
  </BrowserRouter>
  </CommonState>
    
 
  
);


