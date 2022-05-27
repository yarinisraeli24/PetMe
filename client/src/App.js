
import React , {useState} from 'react';
import NavBarMenu from './components/NavBarMenu';
import SwipesPage from './components/SwipingPage'
import './App.css';
import Login from './components/Login';
import Preferences from './components/preferences/Preferences';
import Register from './components/Register';
import AdminRegister from './components/associations/AdminRegister';

import Home from './components/Home';
import AdminHome from './components/associations/AdminHome';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import FavoritesPage from './components/favorites/FavoritesPage';
import AllAssociationsPage from './components/associations/AllAssociationsPage';
import CreatePetPage from './pets/CreatePetPage';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import PetPage from './pets/PetPage';
import EditProfilePage from './components/profile/EditProfilePage';
import ProfileDetailsPage from './components/profile/ProfileDetailsPage';
import DashboardPage from './components/associations/DashboardSection/DashboardPage'
import { UserDataProvider } from './contexts/UserDataContext';
import { AdminProvider } from './contexts/AdminContext';
import TakeMeHomeTable from './components/associations/TakeMeHomeSection/TakeMeHomeTable'


function App() {
  return (
    <UserDataProvider>
        <AdminProvider>
      <div className="App"> 
        <Router>
        <NavBarMenu />
        <Routes>
            <Route path="" element={<ProtectedRoute />}>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/api-docs' element={<SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />}></Route>
              <Route exact path='/register' element={<Register />}></Route>
              <Route exact path='/' element={<Home />}></Route>
              <Route path="/admin/register" element={<AdminRegister />} />

            </Route>

            <Route path="/users/" element={<PrivateRoute />}>
            <Route path="profile" element={<ProfileDetailsPage/>} />
            <Route path="editProfile" element={<EditProfilePage/>} />
              <Route path="swipes" element={<SwipesPage/>} />
              <Route path="favorites" element={<FavoritesPage/>} />
              <Route path='preferences' element={<Preferences />} />
            </Route>

            <Route path="/admin/" element={<PrivateRoute />}>
                <Route path="home" element={<AdminHome/>} />
                <Route path="createPet" element={<CreatePetPage/>} />
                <Route path="pets" element={<FavoritesPage isAdmin={true}/>} />
                <Route path="takeMeHomeRequests" element={<TakeMeHomeTable />} />
                <Route path="dashboard" element={<DashboardPage />} />

            </Route>

            <Route path="/allAssociations" element={<AllAssociationsPage />}>
            </Route>
            <Route path="/petPage" element={<PetPage />}></Route>
        </Routes>
        </Router>
      </div>
        </AdminProvider>
      </UserDataProvider>
  );
}

export default App;
// export default App = () => <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />;

