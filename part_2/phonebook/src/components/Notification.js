import React from "react";

const Notification = ({ notification, isError }) => {
  if (notification === null) {
    return null;
  }

  if (isError) {
    return <div className="error">{notification}</div>;
  }

  return <div className="notification">{notification}</div>;
};

export default Notification;
