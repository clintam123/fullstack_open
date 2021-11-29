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

let prevId = 0;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(prevId);
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification,
      },
    });
    prevId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, time * 1000);
  };
};

export default notificationReducer;
