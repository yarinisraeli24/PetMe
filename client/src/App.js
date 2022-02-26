import logo from './logo.svg';
import React , {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { CardSwiper } from "react-card-rotate-swiper";
import Navbar from './Navbar';
import Card from './Card'
import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


function App() {
  const images = ['https://thediscerningcat.com/wp-content/uploads/2021/09/british-short-hair-chincilla-up-close.jpg.webp','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*']
  return (
    <div className="App"> 
      <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/user/login' element={< Login />}></Route>
          <Route exact path='/user/register' element={< Register />}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
