const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, time * 1000);
  };
};

export default notificationReducer;
