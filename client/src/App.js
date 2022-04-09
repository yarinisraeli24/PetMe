
import React , {useState} from 'react';
import NavBarMenu from './components/NavBarMenu';
import SwipesPage from './components/SwipingPage'
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
import {UserDataProvider} from './contexts/UserDataContext';
import AllAssociationsPage from './components/associations/AllAssociationsPage';



function App() {
  return (
    <UserDataProvider>
      <div className="App"> 
        <Router>
        <NavBarMenu />
        <Routes>
            <Route path="" element={<ProtectedRoute />}>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/register' element={<Register />}></Route>
              <Route exact path='/' element={<Home />}></Route>

            </Route>

            <Route path="/users/" element={<PrivateRoute />}>
              <Route path="swipes" element={<SwipesPage/>} />
              <Route path="favorites" element={<FavoritesPage/>} />
              <Route path='preferences' element={<Preferences />} />
            </Route>
            <Route path="/AdminPannel/" element={<PrivateRoute />}>
            </Route>

            <Route path="/allAssociations" element={<AllAssociationsPage />}>
            </Route>
        </Routes>
        </Router>
      </div>
    </UserDataProvider>
  );
}

export default App;
