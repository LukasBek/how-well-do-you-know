import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from 'react-dom/client';


import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const completed = localStorage.getItem('finishedquiz');
console.log("checking if completed (" + completed + ") equals null");
if(completed === null){
  
  localStorage.setItem('finishedquiz', 'no');
}



root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


