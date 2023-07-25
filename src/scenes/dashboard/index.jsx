import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, Badge, Popover, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MyCarousel from "../global/Slider2";
import { Tooltip } from "@mui/material";

const Dashboard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [notificationsPerPage] = useState(5);
  const [data1, setData1] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [latestNotification, setLatestNotification] = useState(null);
  const [notificationPopoverAnchor, setNotificationPopoverAnchor] =
    useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [latestDataDate, setLatestDataDate] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);
  const fetchData1 = async () => {
    const url = "http://localhost:3001/getSingleData";

    try {
      const response = await axios.get(url);
      const sortedData = response.data.sort(
        (a, b) => new Date(b.Date) - new Date(a.Date)
      );
      setData1(sortedData);

      // Get the latest date from the fetched data and set it to the state
      if (sortedData.length > 0) {
        setLatestDataDate(sortedData[0].Date);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const currentNotifications = notifications
    .slice(startIndex, startIndex + notificationsPerPage)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleNotificationPopoverOpen = (notification) => (event) => {
    if (notification) {
      setLatestNotification(notification);
    }

    const lastNotificationIndex = startIndex + notificationsPerPage - 1;
    const newNotificationCount =
      notifications.length - lastNotificationIndex - 1;
    setNewNotificationCount(
      newNotificationCount < 0 ? 0 : newNotificationCount
    );

    setNotificationPopoverAnchor(event.currentTarget);
  };

  const handleNotificationPopoverClose = () => {
    setNotificationPopoverAnchor(null);
  };

  const downloadPDF = async (filename) => {
    const fileURL = `http://localhost:3000/uploads/${filename}`;

    try {
      const response = await axios.get(fileURL, {
        responseType: "blob",
      });

      const blobData = response.data;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blobData);
      link.target = "_blank";
      link.download = filename;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const openPDF = (filename) => {
    window.open(`http://localhost:3000/uploads/${filename}`, "_blank");
  };

  const showNextNotifications = () => {
    setStartIndex(startIndex + notificationsPerPage);
  };

  const showPreviousNotifications = () => {
    setStartIndex(startIndex - notificationsPerPage);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  const formatCustomDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleString(undefined, options)
      .replace(/(\d+:\d+)(\s\w+)/, "$1$2");
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="content min-w-screen" style={{ backgroundColor: "white" }}>
      <div className="col main pt-5 mt-3 container">
        <p className="lead d-none d-sm-block">Welcome to your Dashboard</p>
        <p className="flex flex-row-reverse text-2xl mr-5 my-2 font-bold">
          {formatCustomDate(latestDataDate)}
        </p>

        <div className="lg:text-lg sm:grid grid-cols-4 pb-3 mb-3 text-sm sm:w-full">
          <div className="mr-3 pb-3">
            <div className="card text-white h-100 ">
              <div
                className="card-body bg-success rounded"
                style={{
                  background: "linear-gradient(to right, #1cbf4b, #0c8f2c)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-code fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Classes Attended</h6>
                <h1
                  className="display-4 cursor-pointer"
                  onMouseOver={handleHover}
                  onMouseLeave={handleMouseLeave}
                >
                  {data1.length > 0
                    ? isHovered
                      ? `${data1[0].ClassesAttend}/${data1[0].TotalAttend}`
                      : data1[0].ClassesAttend
                    : 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient( to right, #FFA500, #FF6347)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-cubes fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Rank</h6>
                <h1 className="display-4">
                  {data1.length > 0 ? data1[0].Rank : 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient( to right, #FFA500, #FF6347)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-cubes fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Test Attempted</h6>
                <h1 className="display-4">{data1.length > 0 ? `x` : 0}</h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient(to right, #007bff, #090979)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-info fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Batch Name</h6>
                <h2 className="display-4">
                  {data1.length > 0 ? data1[0].studentId.batch : 0}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="w-full mb-6">
    <div className="card w-full">
      <div className="card-header">
        <h2>
          <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> Test Information
        </h2>
      </div>
      <div className="card-body">
        <div className="carousel-wrapper">
          <MyCarousel />
        </div>
      </div>
    </div>
  </div>

  <div className="w-full">
    <div className="w-full card mr-6 overflow-hidden">
      <div className="card-header">
        <h2>
          <IconButton
            onClick={handleNotificationPopoverOpen(null)}
            color="inherit"
            aria-label="notifications"
          >
            <Badge badgeContent={newNotificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          Notifications
        </h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {currentNotifications.map((notification, index) => (
            <div
              className="list-group-item list-group-item-action flex-column align-items-start"
              key={index}
            >
              <div className="d-flex w-full justify-between">
                <h5 className="mb-1">{notification.originalname}</h5>
                <small>{formatDate(notification.createdAt)}</small>
              </div>
              <p className="mb-1">{notification.description}</p>
              <small>Company: {notification.companyName}</small>

              <div className="d-flex mt-2">
                <IconButton
                  onClick={() => downloadPDF(notification.filename)}
                  style={{ color: "red" }}
                >
                  <CloudDownloadIcon />
                </IconButton>
                <IconButton
                  onClick={() => openPDF(notification.filename)}
                  style={{ color: "blue" }}
                >
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-buttons">
          {startIndex > 0 && (
            <IconButton onClick={showPreviousNotifications} style={{ color: "blue" }}>
              <NavigateBeforeIcon />
            </IconButton>
          )}
          {startIndex + notificationsPerPage < notifications.length && (
            <IconButton onClick={showNextNotifications} style={{ color: "blue" }}>
              <NavigateNextIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
      <Popover
        open={Boolean(notificationPopoverAnchor)}
        anchorEl={notificationPopoverAnchor}
        onClose={handleNotificationPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {latestNotification && (
          <div style={{ padding: "16px" }}>
            <Typography variant="subtitle1">
              {latestNotification.originalname}
            </Typography>
            <Typography variant="caption">{latestNotification.date}</Typography>
            <Typography variant="body2">
              {latestNotification.description}
            </Typography>
            <Typography variant="caption">
              Company: {latestNotification.companyName}
            </Typography>
          </div>
        )}
        {!latestNotification && (
          <div style={{ padding: "16px" }}>
            <Typography variant="subtitle1">No new notifications</Typography>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default Dashboard;
