import React from 'react';
import SignupPage from '../UserLogin/SignupPage';
import LoginPage from '../UserLogin/LoginPage';
import CustomLink from "../../customComponents/CustomLink"
import Logo from "../../images/Logo_1.6.png"

function landingPage(props) {
    return (
        <div className="landing-container">
            <div className="logo-header">
                <img src={Logo} className="site-logo" alt="Site Logo"></img>
                <h1>Network</h1>
            </div>
            <div><CustomLink className="custom-link" to="/login">Login</CustomLink></div>
            <div><CustomLink className="custom-link" to="/signup">Signup</CustomLink></div>
            <div><CustomLink className="custom-link" to="/privacy_policy">Privacy Policy</CustomLink></div>
            <div className="support-email">Support Email: benmoxon256@gmail.com</div>
        </div>
    );
}

export default landingPage;
