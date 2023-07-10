import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const notifications = useSelector(state => state.notifications);

    return (
        <div className="notifications-dropdown">
            {(!Array.isArray(notifications) || notifications.length === 0) ? (
                <div className="notification-item">No new notifications</div>
            ) : (
                [...notifications].reverse().map((notification, index) => {
                    let path;
                    if (notification.type === 'message') {
                        path = `/messages/${notification.content.room}`;
                    } else if (notification.type === 'comment' || notification.type === 'reply') {
                        path = `/post/${notification.content.id}`;
                    }
                    
                    return path ? (
                        <Link className="notification-link" to={path} key={index}>
                            <div className="notification-item">
                                New {(typeof notification.type === 'string' ? notification.type : 'unknown')}
                                from {(typeof notification.sender === 'string' ? notification.sender.split('@')[0] : 'unknown')}:
                                "{(notification.content && typeof notification.content.message === 'string') ?
                                (notification.content.message.length > 20 ? notification.content.message.slice(0, 20) + '...' : notification.content.message)
                                : 'No message'}"
                            </div>
                        </Link>
                    ) : (
                        <div key={index} className="notification-item">
                            New {(typeof notification.type === 'string' ? notification.type : 'unknown')}
                            from {(typeof notification.sender === 'string' ? notification.sender.split('@')[0] : 'unknown')}:
                            "{(notification.content && typeof notification.content.message === 'string') ?
                            (notification.content.message.length > 20 ? notification.content.message.slice(0, 20) + '...' : notification.content.message)
                            : 'No message'}"
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Notifications;
