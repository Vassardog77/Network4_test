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
                        New {notification.type} from {notification.sender.split('@')[0]}: "{notification.content.message.length > 20 ? notification.content.message.slice(0, 20) + '...' : notification.content.message}"
                    </div>
                ))
            )}
        </div>
    )
}

export default Notifications;
