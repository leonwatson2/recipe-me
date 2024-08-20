import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GoogleUser, User } from "./types";
import { loginUser } from "../../firebase/actions";
import { useNavigate } from "react-router-dom";

export type UserContextType = {
  googleUser?: GoogleUser;
  loggedIn: boolean;
  loadingUser: boolean; 
  user?: User;
  login: (googleUser: GoogleUser) => void,
  logout: () => void,

};

const defaultUserContext: UserContextType = {
  loggedIn: false,
  loadingUser: false,
  login: () => { },
  logout: () => { },
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const useProtectedRoute = (isAllowed:boolean, redirect?:string) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAllowed) return;
    navigate(redirect ? redirect : '/') 
  }, [isAllowed, redirect, navigate])
}

export const useUser: () => UserContextType = () => {
  const [user, setUser] = useState<User>()
  const [googleUser, setGoogleUser] = useState<GoogleUser>()
  const [loggedIn, setLoggedIn] = useState(false)
  const [loadingUser, setLoading] = useState(false)

  const login = useCallback(async (googleUser: GoogleUser) => {
    setLoading(true)
    await loginUser(googleUser.email).then((user)=>{
      setUser(user);
      setLoggedIn(true)
      setGoogleUser(googleUser)
    }).finally(()=>{
        setLoading(false)

      })
  }, [setGoogleUser, setLoggedIn])

  const logout = useCallback(() => {
    setLoggedIn(false)
    setGoogleUser(undefined)
    setUser(undefined)
  }, [])

  return {
    user,
    googleUser,
    loggedIn,
    login,
    logout,
    loadingUser
  }

}
