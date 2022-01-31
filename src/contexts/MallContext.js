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
      dispatch({
        type: "SET_ALL_CHILD",
        payload: { allItems: snapshot.docs.map(database.formatDoc) },
      });
    });
  }, []);

  {
    /*useEffect(() => {
    return database.profile.onSnapshot((snapshot) => {
      console.log(snapshot.docs.map(database.formatDoc));
      dispatch({
        type: "SET_ALL_SHOP",
        payload: { allShops: snapshot.docs.map(database.formatDoc) },
      });
    });
  }, []);*/
  }
  function getUserByEmail(email) {
    console.log(email);
    database.profile.where("email", "==", email).onSnapshot((snapshot) => {
      if (snapshot.docs.map(database.formatDoc) !== []) {
        console.log(snapshot.docs.map(database.formatDoc)[0].uid);
        return snapshot.docs.map(database.formatDoc)[0].uid;
      } else return "";
    });
  }

  const getItems = async (condition) => {
    if (condition.includes("@")) {
      database.profile.where("email", "==", condition).onSnapshot((snapshot) => {
        if (snapshot.docs.map(database.formatDoc) !== []) {
          console.log(snapshot.docs.map(database.formatDoc)[0].uid);
          const uid = snapshot.docs.map(database.formatDoc)[0].uid;
          database.shop_item
            .where("userId", "==", uid)
            .onSnapshot((snapshot) => {
              dispatch({
                type: "GET_CHILD",
                payload: { allItems: snapshot.docs.map(database.formatDoc) },
              });
            });
        }
      });
    } else {
      database.shop_item
        .where("name", "==", condition)
        .onSnapshot((snapshot) => {
          dispatch({
            type: "GET_CHILD",
            payload: { allItems: snapshot.docs.map(database.formatDoc) },
          });
        });
    }
  };

  

  const value = { MallState, getItems };

  return <MallContext.Provider value={value}>{children}</MallContext.Provider>;
}
