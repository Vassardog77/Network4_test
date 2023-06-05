import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomLink from "../../customComponents/CustomLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useLogout } from "../../hooks/useLogout";
import { base_url } from "../../api";
import Notifications from './Notifications';

export default function NavBar() {
    const { logout } = useLogout();
    const current_user = JSON.parse(localStorage.getItem('user'))

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        axios.post(base_url+'/notification/get',
        {user: current_user.email})
            .then(response => {
                console.log(response.data)
                setNotifications(response.data);
                localStorage.setItem('notifications', JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);

    const handleBellClick = () => {
        setShowNotifications(!showNotifications);
    }

    let notificationCount = JSON.parse(localStorage.getItem('notifications'))?.length || 0;

    return (
        <div className="Topbar">
            <CustomLink to="/social-add">Add Social Media Accounts +</CustomLink>
            <div>
                <div className="notification-icon" onClick={handleBellClick}>
                    <FontAwesomeIcon icon={faBell}/>
                    {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
                    {showNotifications && <Notifications />}
                </div>
                <img src={current_user.profile_pic} alt=""></img>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}
