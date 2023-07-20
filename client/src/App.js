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
import SinglePost from './components/Feed/SinglePost';
import Form from './components/Posting/Form';

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
            <Route path='/login' element={!user ? <LoginPage/> : <Navigate to="/"/>}></Route>
            <Route path='/signup' element={!user ? <SignupPage/> : <Navigate to="/"/>}></Route>
            <Route path='/social-add' element={current_user.account_type !== 'student' ? <LoginList/> : <Navigate to="/feed"/>}></Route>
            <Route path='/' element={current_user.account_type !== 'student' ? <Home/> : <Navigate to="/feed"/>}></Route>
            <Route path='/feed' element={<Feed/> }></Route>
            <Route path='/messages' element={<Messages/>}></Route>
            <Route path='/messages/:url_room' element={<Messages/>}></Route>
            <Route path='/email' element={current_user.account_type !== 'student' ? <Email/> : <Navigate to="/feed"/>}></Route>
            <Route path='/rsvp' element={current_user.account_type !== 'student' ? <Rsvp/> : <Navigate to="/feed"/>}></Route>
            <Route path='/analytics' element={current_user.account_type !== 'student' ? <Analytics/> : <Navigate to="/feed"/>}></Route>
            <Route path='/post/:id' element={<SinglePost/>}></Route>
            <Route path='/create_post' element={current_user.account_type !== 'student' ? <Form/> : <Navigate to="/feed"/>}></Route>
            <Route path={'/profile/'+current_user.email} element={current_user.account_type !== 'student' ? <Profile/> : <Navigate to="/feed"/>}></Route>
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
            <Route path='/messages/:url_room' element={user?<Messages/> : <Navigate to="/login"/>}></Route>
            <Route path='/email' element={user?<Email/> : <Navigate to="/login"/>}></Route>
            <Route path='/rsvp' element={user?<Rsvp/> : <Navigate to="/login"/>}></Route>
            <Route path='/analytics' element={user?<Analytics/> : <Navigate to="/login"/>}></Route>
            <Route path='/post/:id' element={user?<SinglePost/> : <Navigate to="/login"/>}></Route>
            <Route path='/create_post' element={user?<Form/> : <Navigate to="/login"/>}></Route>
            <Route path='/profile' element={user?<Profile/> : <Navigate to="/login"/>}></Route>
        </Routes>
      )
    }
  }

export default App;
