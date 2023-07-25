import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton, Badge, Popover, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MyCarousel from "../global/Slider2";

const Dashboard = () => {
  const [record, setRecord] = useState([]);
  const [marks, setMarks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [notificationsPerPage] = useState(5);
  const [data1, setData1] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [latestNotification, setLatestNotification] = useState(null);
  const [notificationPopoverAnchor, setNotificationPopoverAnchor] = useState(
    null
  );

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.20:3000/data"); // Update this URL with the correct server URL
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const fetchData1 = async () => {
      const url = "http://localhost:3001/getSingleData";

      let data = await axios.get(url);

      console.log("testshare", data.data);

      if (data) {
        setData1(data.data);
      }
    };
    fetchData1();
  }, []);

  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  // Function to handle opening the popover and showing notification details
  const handleNotificationPopoverOpen = (notification) => (event) => {
    if (notification) {
      setLatestNotification(notification);
      setNewNotificationCount(0); // Reset the new notification count when popover is opened
    }
    setNotificationPopoverAnchor(event.currentTarget);
  };

  // Function to handle closing the popover
  const handleNotificationPopoverClose = () => {
    setNotificationPopoverAnchor(null);
  };

  // Reverse the currentNotifications array to show notifications in reverse order
  const reversedNotifications = currentNotifications.slice().reverse();

  // Function to handle downloading the PDF
  
  const downloadPDF = async (filename) => {
    const fileURL = `http://192.168.1.20:3000/uploads/${filename}`;

    try {
      const response = await axios.get(fileURL, {
        responseType: "blob",
      });

      const blobData = response.data;

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blobData);
      link.target = "_blank";
      link.download = filename;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle opening the PDF in a new tab
  const openPDF = (filename) => {
    window.open(`http://192.168.1.20:3000/uploads/${filename}`, "_blank");
  };

  // Function to show next notifications
  const showNextNotifications = () => {
    setStartIndex(startIndex + notificationsPerPage);
  };

  // Function to show previous notifications
  const showPreviousNotifications = () => {
    setStartIndex(startIndex - notificationsPerPage);
  };

  return (
    <div className="content" style={{ backgroundColor: "white" }}>
      <div style={{ backgroundColor: "white" }}>
        <div className="col main pt-5 mt-3 container">
          <p className="lead d-none d-sm-block">Welcome to your Dashboard</p>

          {data1 &&
            data1.map((data) => (
              <React.Fragment key={data?.TotalAttend}>
              <div className="row mb-3">
                    <div className="col-xl-4 col-sm-6 py-2">
                      <div className="card text-white h-100 ">
                        <div
                          className="card-body bg-success rounded"
                          style={{
                            background:
                              "linear-gradient(to right, #1cbf4b, #0c8f2c)",
                          }}
                        >
                          <div className="rotate">
                            <i className="fa fa-code fa-4x"></i>
                          </div>

                          <h6 className="text-uppercase">Total classes</h6>
                          <h1 className="display-4">{data?.TotalAttend}</h1>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4 col-sm-6 py-2">
                      <div className="card text-white h-100">
                        <div
                          className="card-body bg-info rounded"
                          style={{
                            background:
                              "linear-gradient( to right, #FFA500, #FF6347)",
                          }}
                        >
                          <div className="rotate">
                            <i
                              className="fa fa-cubes fa-4x"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <h6 className="text-uppercase">classes attended</h6>
                          <h1 className="display-4">{data?.ClassesAttend}</h1>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4 col-sm-6 py-2">
                      <div className="card text-white ">
                        <div
                          className="card-body bg-info rounded"
                          style={{
                            background:
                              "linear-gradient(to right, #007bff, #090979)",
                          }}
                        >
                          <div className="rotate">
                            <i
                              className="fa fa-info fa-4x"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <h6 className="text-uppercase">Test Shares</h6>
                          <h1 className="display-4">{data?.TestShare}</h1>
                        </div>
                      </div>
                    </div>
               </div>
                <hr />
              </React.Fragment>
            ))}

          {/* --------------- */}

          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-5 col-xs-12">
              <div className="card">
                <div className="card-header">
                  <h2>
                    <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>{" "}
                    Test Information
                  </h2>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-hover">
                    <MyCarousel />
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="card">
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
                    {reversedNotifications.map((notification, index) => (
                      <div
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        key={index}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{notification.originalname}</h5>
                          <small>{notification.date}</small>
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
                      <IconButton
                        onClick={showPreviousNotifications}
                        style={{ color: "blue" }}
                      >
                        <NavigateBeforeIcon />
                      </IconButton>
                    )}
                    {startIndex + notificationsPerPage < notifications.length && (
                      <IconButton
                        onClick={showNextNotifications}
                        style={{ color: "blue" }}
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popover for showing notification details */}
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