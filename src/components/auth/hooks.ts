import { useState, useEffect, useCallback } from "react";
import {
  clearUserLocalStorage,
  hasValidUserStorage,
  updateUserLocalStorage,
  UserContextType,
} from "./context";
import { getGoogleUserData } from "./actions";
import { loginUser } from "../../firebase/actions";
import { GoogleUser, User } from "./types";
import { LS_CREDS } from "../utils";

export const useUser: () => UserContextType = () => {
  const [user, setUser] = useState<User>();
  const [googleUser, setGoogleUser] = useState<GoogleUser>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingUser, setLoading] = useState(false);

  useEffect(() => {
    if (loggedIn && user) {
      return;
    } else if (hasValidUserStorage()) {
      const credential = localStorage.getItem(LS_CREDS) as string;
      updateUserLocalStorage(credential);
      const gUser = getGoogleUserData(credential);
      loginUser(getGoogleUserData(credential).email)
        .then((userRes) => {
          setUser(userRes);
          setLoggedIn(true);
          setGoogleUser(gUser);
        })
        .catch((e) => console.log(e));
    } else {
      clearUserLocalStorage();
    }
  }, [loggedIn, user]);

  const login = useCallback(
    async (googleUser: GoogleUser) => {
      setLoading(true);
      await loginUser(googleUser.email)
        .then((userRes) => {
          setUser(userRes);
          setLoggedIn(true);
          setGoogleUser(googleUser);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setGoogleUser, setLoggedIn],
  );

  const logout = useCallback(() => {
    setLoggedIn(false);
    setGoogleUser(undefined);
    setUser(undefined);
    clearUserLocalStorage();
  }, []);

  return {
    user,
    googleUser,
    loggedIn,
    login,
    logout,
    loadingUser,
  };
};
