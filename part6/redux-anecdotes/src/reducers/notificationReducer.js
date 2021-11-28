const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

export const createNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    data: {
      notification,
    },
  };
};

export default notificationReducer;
