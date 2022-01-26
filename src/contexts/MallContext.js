import React, { useReducer, useEffect, useContext } from "react";
import { database } from "../firebase";
import MallReducer from "../reducers/MallReducer";


const MallContext = React.createContext();

export function useMall() {
  return useContext(MallContext);
}

export function MallProvider({ children }) {
  const [MallState, dispatch] = useReducer(MallReducer, {
    allItems: [],
  });

  useEffect(() => {
    return database.shop_item.onSnapshot((snapshot) => {
      console.log(snapshot);
      dispatch({
        type: "SET_ALL_CHILD",
        payload: { allItems: snapshot.docs.map(database.formatDoc) },
      });
    });
  }, []);

  const getItems = (condition) => {
    database.shop_item.where("name", "==", condition).onSnapshot((snapshot) => {
      dispatch({
        type: "GET_CHILD",
        payload: { allItems: snapshot.docs.map(database.formatDoc) },
      });
    });
  };


  const value = { MallState, getItems };

  return <MallContext.Provider value={value}>{children}</MallContext.Provider>;
}
