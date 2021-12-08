import React from "react";
import { useSelector } from "react-redux";

const style = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  margin: 10,
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return null;
  if (notification.type === "success") {
    const successStyle = { ...style, color: "green" };
    return <div style={successStyle}>{notification.message}</div>;
  } else {
    const errorStyle = { ...style, color: "red" };
    return <div style={errorStyle}>{notification.message}</div>;
  }
};

export default Notification;
