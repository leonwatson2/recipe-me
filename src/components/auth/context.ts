import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GoogleUser, User } from "./types";
import { loginUser } from "../../firebase/actions";
import { useNavigate } from "react-router-dom";
import { getGoogleUserData } from "./actions";

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

export const useProtectedRoute = (isAllowed: boolean, redirect?: string) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAllowed) return;
    navigate(redirect ? redirect : '/')
  }, [isAllowed, redirect, navigate])
}

const LS_CREDS = 'ga-creds'
const LS_EXPIRE = 'rs-expire'
const EXPIRE_DURATION_DAYS = 2

export const updateUserLocalStorage = (credential:string) => {
  if(credential.length === 0) return
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate()+EXPIRE_DURATION_DAYS)
  localStorage.setItem(LS_CREDS, credential)
  localStorage.setItem(LS_EXPIRE, expireDate.toJSON())
}
const clearUserLocalStorage = () => {
  localStorage.removeItem(LS_CREDS)
  localStorage.removeItem(LS_EXPIRE)
}
const hasValidUserStorage = () => {

 if (localStorage.getItem(LS_CREDS)) {
    const expireDateJSON = localStorage.getItem(LS_EXPIRE) as string
    const expireDate = new Date(expireDateJSON)
    const currentTime = new Date()
    if(expireDate.valueOf() > currentTime.valueOf()){ 
      return true;
    }
  }
}

export const useUser: () => UserContextType = () => {
  const [user, setUser] = useState<User>()
  const [googleUser, setGoogleUser] = useState<GoogleUser>()
  const [loggedIn, setLoggedIn] = useState(false)
  const [loadingUser, setLoading] = useState(false)

  useEffect(() => {
    if (loggedIn && user) {
      return
    } else if (hasValidUserStorage()) {
      const credential = localStorage.getItem(LS_CREDS) as string
      updateUserLocalStorage(credential)
      const gUser = getGoogleUserData(credential)
      loginUser(getGoogleUserData(credential).email).then((userRes) => {
        setUser(userRes);
        setLoggedIn(true);
        setGoogleUser(gUser);

      }).catch(e => console.log(e))
    } else {
      clearUserLocalStorage()
    }

  }, [loggedIn, user])


  const login = useCallback(async (googleUser: GoogleUser) => {
    setLoading(true)
    await loginUser(googleUser.email).then((userRes) => {
      setUser(userRes);
      setLoggedIn(true)
      setGoogleUser(googleUser)
    }).finally(() => {
      setLoading(false)

    })
  }, [setGoogleUser, setLoggedIn])

  const logout = useCallback(() => {
    setLoggedIn(false)
    setGoogleUser(undefined)
    setUser(undefined)
    clearUserLocalStorage()
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
