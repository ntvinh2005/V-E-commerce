const ShopReducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case "SET_MESSAGES":
        return {
          ...state,
          messages: payload.messages,
        };
      case "SET_NEW_MESSAGES":
        console.log('Yeah')
        return {
          ...state,
          recentMail: payload.recentMail,
        }
      default:
        return state;
    }
  };
  export default ShopReducer;