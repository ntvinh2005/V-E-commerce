import { useReducer, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";
import MessageReducer from "../reducers/MessageReducer";

export function useMessage(address) {
  const { user } = useAuth();

  const [MessageState, dispatch] = useReducer(MessageReducer, {
    messages: [],
    recentMail: []
  });

  useEffect(() => {
    return database.messages
      .where("speakers", "in", [
        [user.email, address],
        [address, user.email],
      ])
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map(database.formatDoc));
        dispatch({
          type: "SET_MESSAGES",
          payload: { messages: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [user]);

  function getMessages() {
    database.messages
      .where("speakers", "in", [
        {speaker: user.email, listener: address},
        {speaker: address, listener: user.email},
      ])
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: "SET_MESSAGES",
          payload: { messages: snapshot.docs.map(database.formatDoc) },
        });
      });
  }

  function getNewMessages() {
    console.log("ucsdkvk")
    database.messages
      .where("speakers.listener", "==",  
        user.email
      )
      .orderBy("createdAt")
      .limit(10)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map(database.formatDoc));
        dispatch({
          type: "SET_NEW_MESSAGES",
          payload: { recentMail: snapshot.docs.map(database.formatDoc) },
        });
      });
  }

  return [MessageState, getMessages, getNewMessages];
}
