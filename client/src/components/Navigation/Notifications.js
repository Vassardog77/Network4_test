import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications'));
        setNotifications(storedNotifications ? storedNotifications : []);
    }, []);

    return (
        <div className="notifications-dropdown">
            {notifications.length === 0 ? (
                <div className="notification-item">No new notifications</div>
            ) : (
                [...notifications].reverse().map((notification, index) => (
                    <div key={index} className="notification-item">
                        You got a {notification.type} from {notification.sender}
                    </div>
                ))
            )}
        </div>
    )
}

export default Notifications;
