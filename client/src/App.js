import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

import NavBar from './components/Navigation/Navbar';
import TopBar from './components/Navigation/Topbar';
import LoginPage from './components/UserLogin/LoginPage';
import SignupPage from './components/UserLogin/SignupPage';
import LoginList from './components/MediaLogin/LoginList';
import Messages from './components/Messages/ChatVisuals';
import Feed from './components/Feed/Feed';
import Home from './components/Home/homeVisuals';
import Email from './components/Email/emailVisuals';
import Rsvp from './components/Rsvp/rsvpVisuals';
import Analytics from './components/Analytics/analyticsFunctionality';
import Profile from './components/Profile/profileMain';
import AltProfile from './components/Profile/profileView';
import SinglePost from './components/Feed/SinglePost';
import Form from './components/Posting/Form';
import LandingPage from './components/Home/landingPage';
import PrivacyPolicy from './components/Home/privacyPolicy';

function App() {
    const { user } = useAuthContext();
    const current_user = JSON.parse(localStorage.getItem('user'));
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, 1);  // This will wait for 1 millisecond
    
        return () => clearTimeout(timer);  // Clean up the timer if the component is unmounted
    }, []);
    if (!shouldRender) {
        return <div>Loading...</div>
    }

    if (user) {
        return (
            <div>
                <NavBar />
                <TopBar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={user ? <Navigate to="/home" /> :<LandingPage />} />
                        <Route path='/login' element={user ? <Navigate to="/home" /> : <LoginPage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/privacy_policy' element={<PrivacyPolicy />} />
                        <Route path='/social-add' element={current_user.account_type !== 'student' ? <LoginList /> : <Navigate to="/feed" />} />
                        <Route path='/home' element={current_user.account_type !== 'student' ? <Home /> : <Navigate to="/feed" />} />
                        <Route path='/feed' element={<Feed />} />
                        <Route path='/messages' element={<Messages />} />
                        <Route path='/messages/:url_room' element={<Messages />} />
                        <Route path='/email' element={current_user.account_type !== 'student' ? <Email /> : <Navigate to="/feed" />} />
                        <Route path='/rsvp' element={current_user.account_type !== 'student' ? <Rsvp /> : <Navigate to="/feed" />} />
                        <Route path='/analytics' element={current_user.account_type !== 'student' ? <Analytics /> : <Navigate to="/feed" />} />
                        <Route path='/post/:id' element={<SinglePost />} />
                        <Route path='/create_post' element={current_user.account_type !== 'student' ? <Form /> : <Navigate to="/feed" />} />
                        <Route path={'/profile/' + current_user.email} element={current_user.account_type !== 'student' ? <Profile /> : <Navigate to="/feed" />} />
                        <Route path={'/profile/:id'} element={<AltProfile />} />
                    </Routes>
                </div>
            </div>
        );
    } else {
        return (
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/privacy_policy' element={<PrivacyPolicy />} />
                {/*<Route path='/social-add' element={<LoginList />} />*/}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }
}

export default App;
