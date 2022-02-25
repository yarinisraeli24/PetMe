import logo from './logo.svg';
import React , {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { CardSwiper } from "react-card-rotate-swiper";
import Navbar from './Navbar';
import Card from './Card'
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';

function App() {
  const images = ['https://thediscerningcat.com/wp-content/uploads/2021/09/british-short-hair-chincilla-up-close.jpg.webp','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*']
  console.log('rendered')
  return (
    <div className="App"> 
      <Navbar />
      <Home />
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <div className="card">
        {images.map((imageUrl, index) => <Card zIndex={index} image={imageUrl}/>)}
      </div> */}
    </div>
  );
}

export default App;
