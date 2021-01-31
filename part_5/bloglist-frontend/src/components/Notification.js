import React from "react";

const Notification = ({ notification, error }) => {
  if (notification === null && error === null) {
    return null;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return <div className="notification">{notification}</div>;
};

export default Notification;
