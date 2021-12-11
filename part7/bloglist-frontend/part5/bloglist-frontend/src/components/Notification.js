import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return null;
  if (notification.type === "success") {
    return <Alert severity="success">{notification.message}</Alert>;
  } else {
    return <Alert severity="error">{notification.message}</Alert>;
  }
};

export default Notification;
