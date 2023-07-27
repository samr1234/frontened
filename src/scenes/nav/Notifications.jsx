import React, { useState, useEffect } from 'react';
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastFetchedNotificationTime, setLastFetchedNotificationTime] = useState(null);
  const [highlightedNotificationIds, setHighlightedNotificationIds] = useState([]);

  const handleNotificationsClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications');
      const sortedNotifications = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sort in descending order
      setNotifications(sortedNotifications);

      // Check if there are new notifications based on the timestamp of the last fetched notification
      if (lastFetchedNotificationTime && sortedNotifications.length > 0) {
        const newNotifications = sortedNotifications.filter(
          (notification) => notification.createdAt > lastFetchedNotificationTime
        );

        // If there are new notifications, update the bell icon to notify
        if (newNotifications.length > 0) {
          setNotificationCount(notificationCount + newNotifications.length);
          setHighlightedNotificationIds(newNotifications.map((notification) => notification._id)); // Highlight the latest notifications
        }
      }

      // Set the timestamp of the latest fetched notification
      if (sortedNotifications.length > 0) {
        setLastFetchedNotificationTime(sortedNotifications[0].createdAt);
      }

      setOpenDialog(true); // Open the dialog when notifications are fetched
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset the notification count and highlighted notifications when the dialog is closed
    setNotificationCount(0);
    setHighlightedNotificationIds([]);
  };

  // Fetch notifications on initial component load
  useEffect(() => {
    handleNotificationsClick();
  }, []);

  const formatCustomDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options).replace(/(\d+:\d+)(\s\w+)/, "$1$2");
  };

  return (
    <div>
      <div className="navbar-item" onClick={handleNotificationsClick}>
        <NotificationsIcon className='ml-96 ' />
        {/* Show notification count on the bell icon */}
        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
      </div>

      {/* Notification Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" classes={{ paper: 'custom-dialog' }}>
        <DialogContent style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h2 className='head'>Notifications</h2>
        
          {notifications.map((notification) => (
            <div key={notification._id} className={highlightedNotificationIds.includes(notification._id) ? 'highlighted' : ''}>
              {/* Display the latest notification on top */}
              <h4>{notification.event}</h4>
              <p>Date: {formatCustomDate(notification.date)}</p>
              <p>Timings: {notification.timings}</p>
              <p>Description: {notification.description}</p>
              <p>
                <a href={notification.url} target="_blank" rel="noopener noreferrer">
                  {notification.url}
                </a>
              </p>
              <hr />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications;
