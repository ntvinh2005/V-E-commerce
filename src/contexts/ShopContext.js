import { useReducer, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";
import ShopReducer from "../reducers/ShopReducer";


export const ROOT_FOLDER = { name: "Root", id: null, path: [], real_path: [] };

export function useFolder(folderId = null, folder = null) {
  const { user } = useAuth();

  const [ShopState, dispatch] = useReducer(ShopReducer, {
    folderId,
    folder,
    childFolders: [],
    childItems: [],
    recipients: [],
  });

  useEffect(() => {
    dispatch({ type: "SELECT_FOLDER", payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: "UPDATE_FOLDER",
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.shop_folder
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: "UPDATE_FOLDER",
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: "UPDATE_FOLDER",
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.shop_folder
      .where("parentId", "==", folderId)
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        dispatch({
          type: "SET_CHILD_FOLDERS",
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, user]);

  useEffect(() => {
    return (
      database.shop_item
        .where("folderId", "==", folderId)
        .where("userId", "==", user.uid)
        .onSnapshot(snapshot => {
          dispatch({
            type: 'SET_CHILD_FILES',
            payload: { childItems: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [folderId, user])

  useEffect(() => {
    return (
      database.recipient
        .where("seller.uid", "==", user.uid)
        .onSnapshot(snapshot => {
          console.log(snapshot.docs.map(database.formatDoc), 231)
          dispatch({
            type: 'SET_RECIPIENTS',
            payload: { recipients: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [user])

  return ShopState;
}