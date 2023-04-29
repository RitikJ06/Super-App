import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from './components/registation_page/Register';
import ChooseCategory from './components/choose_category/ChooseCategory';
import Home from './components/homepage/Home';
import Entertainment from './components/entertainment/Entertainment';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/choose-category' element={<ChooseCategory/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/entertainment' element={<Entertainment/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
