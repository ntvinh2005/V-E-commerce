import { useReducer, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";
import RecipientReducer from "../reducers/RecipientReducer";


export function useRecipient() {
  const { user } = useAuth();

  const [RecipientState, dispatch] = useReducer(RecipientReducer, {
    recipients: [],
    cartItems: [],
  });


  useEffect(() => {
    return (
      database.recipient
        .where("seller.uid", "==", user.uid)
        .onSnapshot(snapshot => {
          dispatch({
            type: 'SET_RECIPIENTS',
            payload: { recipients: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [user])

  useEffect(() => {
    return (
      database.recipient
        .where("custommer", "==", user.uid)
        .onSnapshot(snapshot => {
          dispatch({
            type: 'SET_CART',
            payload: { cartItems: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [user])

  return RecipientState;
}