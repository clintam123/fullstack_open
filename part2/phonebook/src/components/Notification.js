import React from "react";

const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  margin: 10,
};

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  margin: 10,
};

const Notification = ({ message }) => {
  if (message == null) return null;
  if (message.includes("ERROR")) {
    return <div style={errorStyle}>{message}</div>;
  }
  return <div style={successStyle}>{message}</div>;
};

export default Notification;
