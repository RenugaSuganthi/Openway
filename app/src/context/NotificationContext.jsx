import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('openway-notifications');
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    }
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('openway-notifications', JSON.stringify(updated));

    // Send SMS notification to all users except the sender
    sendSMSNotification(notification);
  };

  const sendSMSNotification = async (notification) => {
    // In production, integrate with SMS API (Twilio, Fast2SMS, etc.)
    // Get all registered phone numbers from backend
    // const users = await fetch('/api/users/phone-numbers');
    // const currentUserPhone = notification.senderPhone;
    // 
    // for (const user of users) {
    //   if (user.phone !== currentUserPhone) {
    //     await sendSMS(user.phone, notification.message);
    //   }
    // }
    
    console.log('SMS notification would be sent to all users except:', notification.senderPhone);
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem('openway-notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('openway-notifications', JSON.stringify(updated));
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('openway-notifications');
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
