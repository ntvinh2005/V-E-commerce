import React from "react";
import { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({id: "0", email: "guest@mail.com", password: "You don't need this"});
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return user.updateEmail(email);
  }

  function updatePassword(password) {
    return user.updatePassword(password);
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user!==null) setUser(user);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
