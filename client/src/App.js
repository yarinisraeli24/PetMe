
import React , {useState} from 'react';
import Navbar from './components/Navbar';
import SwipesPage from './components/SwipesPage'
import './App.css';
import Login from './components/Login';
import Preferences from './components/preferences/Preferences';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom';
import { getToken } from './common/utils';
import PrivateRoute from './components/routes/PrivateRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import FavoritesPage from './components/favorites/FavoritesPage';



function App() {
  const images = ['https://thediscerningcat.com/wp-content/uploads/2021/09/british-short-hair-chincilla-up-close.jpg.webp','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*']
  return (
    <div className="App"> 
      <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path="" element={<ProtectedRoute />}>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
          </Route>

          <Route path="/users/" element={<PrivateRoute />}>
            <Route path="swipes" element={<SwipesPage image={images} zIndex={5}/>} />
            <Route path="favorites" element={<FavoritesPage image={images} zIndex={5}/>} />
            <Route path='preferences' element={<Preferences />} />
          </Route>
          <Route path="/AdminPannel/" element={<PrivateRoute />}>
          </Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
