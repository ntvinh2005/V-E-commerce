const RecipientReducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case "SET_RECIPIENTS":
        return {
          ...state,
          recipients: payload.recipients,
        };
      case "SET_CART":
        return {
          ...state,
          cartItems: payload.cartItems,
        };
      default:
        return state;
    }
  };
  export default RecipientReducer;