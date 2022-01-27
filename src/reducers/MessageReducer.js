const ShopReducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case "SET_MESSAGES":
        return {
          ...state,
          messages: payload.messages,
        };
      default:
        return state;
    }
  };
  export default ShopReducer;