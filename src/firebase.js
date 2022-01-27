import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCn1penLqIW6PgC3Azrlzq-618FkF_eATo",
  authDomain: "v-e-commerce-app.firebaseapp.com",
  projectId: "v-e-commerce-app",
  storageBucket: "v-e-commerce-app.appspot.com",
  messagingSenderId: "761118635287",
  appId: "1:761118635287:web:3cdcefcdb918fa4a987352",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const database = {
  shop_folder: firestore.collection("shop_folder"),
  shop_item: firestore.collection("shop_item"),
  profile: firestore.collection("profile"),
  recipient: firestore.collection("recipient"),
  messages: firestore.collection("messages"),
  formatDoc: (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export default app;
