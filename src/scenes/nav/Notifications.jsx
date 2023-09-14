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
  const [latestNotificationRead, setLatestNotificationRead] = useState(false);

  const handleNotificationsClick = async () => {
    try {
      const response = await axios.get('/');
      const sortedNotifications = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setNotifications(sortedNotifications);

      if (lastFetchedNotificationTime && sortedNotifications.length > 0) {
        const newNotifications = sortedNotifications.filter(
          (notification) => new Date(notification.createdAt) > new Date(lastFetchedNotificationTime)
        );

        if (newNotifications.length > 0) {
          setNotificationCount(notificationCount + newNotifications.length);
          setHighlightedNotificationIds((prevIds) => [
            ...prevIds,
            ...newNotifications.map((notification) => notification._id)
          ]);
          setLatestNotificationRead(false);
        }
      }

      if (sortedNotifications.length > 0) {
        setLastFetchedNotificationTime(sortedNotifications[0].createdAt);
      }

      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNotificationCount(0);
    setLatestNotificationRead(true);
  };

  useEffect(() => {
    handleNotificationsClick();
  }, []);

  useEffect(() => {
    localStorage.setItem('highlightedNotifications', JSON.stringify(highlightedNotificationIds));
  }, [highlightedNotificationIds]);

  useEffect(() => {
    const storedHighlightedIds = localStorage.getItem('highlightedNotifications');
    if (storedHighlightedIds) {
      setHighlightedNotificationIds(JSON.parse(storedHighlightedIds));
    }
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
        <NotificationsIcon className=' ' />
        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" classes={{ paper: 'custom-dialog' }}>
        <DialogContent style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="bg-blue-100 p-2 mb-3">
            <h2 className="text-red-500 text-center text-lg font-bold">Notifications</h2>
          </div>

          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`${
                highlightedNotificationIds.includes(notification._id) && !latestNotificationRead
                  ? 'bg-green-100 py-1 px-1 rounded-lg m-2 h-[130px]'
                  : ''
              }`}
            >
              <h4 className='text-xl font-mono text-green-500 font-medium'>{notification.event}</h4>
              <p>Date: {formatCustomDate(notification.date)}</p>
              <p>Timings: {notification.timings}</p>
              <p>Description: {notification.description}</p>
              <p>
                <a href={notification.url} target="_blank" className='text-blue-500' rel="noopener noreferrer">
                  {notification.url}
                </a>
              </p>
              <hr className='mt-2' />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications;
