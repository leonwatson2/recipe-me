import { createContext, useCallback, useContext, useState } from "react";
import { GoogleUser, User } from "./types";

export type UserContextType = {
  googleUser?: GoogleUser;
  loggedIn: boolean;
  user?: User;
  login: (googleUser: GoogleUser) => void,
  logout: () => void,

};

const defaultUserContext: UserContextType = {
  loggedIn: false,
  login: () => { },
  logout: () => { },
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const useUser: () => UserContextType = () => {
  const [user, setUser] = useState<User>()
  const [googleUser, setGoogleUser] = useState<GoogleUser>()
  const [loggedIn, setLoggedIn] = useState(false)
  const login = useCallback((googleUser: GoogleUser) => {
    console.log(googleUser)
    setLoggedIn(true)
    setGoogleUser(googleUser)
  }, [setGoogleUser, setLoggedIn])

  const logout = useCallback(() => {
    setLoggedIn(false)
    setGoogleUser(undefined)
  }, [])

  return {
    user,
    googleUser,
    loggedIn,
    login,
    logout,
  }

}
