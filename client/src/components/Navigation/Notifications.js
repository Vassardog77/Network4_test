import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
    const notifications = useSelector(state => state.notifications);
    console.log(notifications)

    return (
        <div className="notifications-dropdown">
            {(!Array.isArray(notifications) || notifications.length === 0) ? (
                <div className="notification-item">No new notifications</div>
            ) : (
                [...notifications].reverse().map((notification, index) => (
                    <div key={index} className="notification-item">
                        New {(typeof notification.type === 'string' ? notification.type : 'unknown')} 
                        from {(typeof notification.sender === 'string' ? notification.sender.split('@')[0] : 'unknown')}: 
                        "{(notification.content && typeof notification.content.message === 'string') ? 
                        (notification.content.message.length > 20 ? notification.content.message.slice(0, 20) + '...' : notification.content.message) 
                        : 'No message'}"
                    </div>
                ))
            )}
        </div>
    )
}

export default Notifications;
