import { useReducer, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";
import MessageReducer from "../reducers/MessageReducer";


export function useMessage(address) {
  const { user } = useAuth();

  const [MessageState, dispatch] = useReducer(MessageReducer, {
    messages: [],
  });


  useEffect(() => {
    return (
      database.messages
        .where("speakers", "in", [[user.email, address], [address, user.email]])
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
            console.log(snapshot.docs.map(database.formatDoc))
          dispatch({
            type: 'SET_MESSAGES',
            payload: { messages: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [user])

  function getMessages() {
    database.messages
    .where("speakers", "in", [[user.email, address], [address, user.email]])
    .orderBy("createdAt")
    .onSnapshot(snapshot => {
        console.log(snapshot.docs.map(database.formatDoc))
      dispatch({
        type: 'SET_MESSAGES',
        payload: { messages: snapshot.docs.map(database.formatDoc) },
      })
    })
  }


  return [MessageState, getMessages];
}