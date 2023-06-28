import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext';

import NavBar from './components/Navigation/Navbar'
import TopBar from './components/Navigation/Topbar'
import LoginPage from './components/UserLogin/LoginPage';
import SignupPage from './components/UserLogin/SignupPage';
import LoginList from './components/MediaLogin/LoginList'
import Messages from './components/Messages/ChatVisuals';
import Feed from './components/Feed/Feed';
import Home from './components/Home/homeVisuals';
import Email from './components/Email/emailVisuals';
import Rsvp from './components/Rsvp/rsvpVisuals';
import Analytics from './components/Analytics/analyticsFunctionality';
import Profile from './components/Profile/profileMain';

function App() {

  const { user } = useAuthContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1); // delay for 1ms
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or return null, or some loading spinner
  }

  const current_user = JSON.parse(localStorage.getItem('user'))

  if (user) {     //if the user exists (is logged in) render page normally, otherwise render login page, and redirect to login page if on any other page
  return (
    <div>
      <NavBar></NavBar>
      <TopBar/>
      <div className='container'>
        <Routes>
          <Route path='/login' element={!user?<LoginPage/> : <Navigate to="/"/>}></Route>
          <Route path='/signup' element={!user?<SignupPage/> : <Navigate to="/"/>}></Route>
          <Route path='/social-add' element={<LoginList/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/feed' element={<Feed/> }></Route>
          <Route path='/messages' element={<Messages/>}></Route>
          <Route path='/email' element={<Email/>}></Route>
          <Route path='/rsvp' element={<Rsvp/>}></Route>
          <Route path='/analytics' element={<Analytics/>}></Route>
          <Route path={'/profile/'+current_user.email} element={<Profile/>}></Route>
        </Routes>
      </div>
    </div>
  )}
  else {
    return(
      <Routes>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/social-add' element={<LoginList/>}></Route>
          <Route path='/' element={user?<Home/> : <Navigate to="/login"/>}></Route>
          <Route path='/feed' element={user?<Feed/> : <Navigate to="/login"/>}></Route>
          <Route path='/messages' element={user?<Messages/> : <Navigate to="/login"/>}></Route>
          <Route path='/email' element={user?<Email/> : <Navigate to="/login"/>}></Route>
          <Route path='/rsvp' element={user?<Rsvp/> : <Navigate to="/login"/>}></Route>
          <Route path='/analytics' element={user?<Analytics/> : <Navigate to="/login"/>}></Route>
          <Route path='/profile' element={user?<Profile/> : <Navigate to="/login"/>}></Route>
      </Routes>
    )
  }
}

export default App;
