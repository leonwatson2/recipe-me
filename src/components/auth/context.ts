import { createContext, useContext } from "react";
import { GoogleUser, User } from "./types";
import { EXPIRE_DURATION_DAYS, LS_CREDS, LS_EXPIRE } from "@utils";

export type UserContextType = {
  googleUser?: GoogleUser;
  loggedIn: boolean;
  loadingUser: boolean;
  user?: User;
  login: (googleUser: GoogleUser) => void;
  logout: () => void;
};

const defaultUserContext: UserContextType = {
  loggedIn: false,
  loadingUser: true,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const updateUserLocalStorage = (credential: string) => {
  if (credential.length === 0) return;
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + EXPIRE_DURATION_DAYS);
  localStorage.setItem(LS_CREDS, credential);
  localStorage.setItem(LS_EXPIRE, expireDate.toJSON());
};
export const clearUserLocalStorage = () => {
  localStorage.removeItem(LS_CREDS);
  localStorage.removeItem(LS_EXPIRE);
};
export const hasValidUserStorage = () => {
  if (localStorage.getItem(LS_CREDS)) {
    const expireDateJSON = localStorage.getItem(LS_EXPIRE) as string;
    const expireDate = new Date(expireDateJSON);
    const currentTime = new Date();
    if (expireDate.valueOf() > currentTime.valueOf()) {
      return true;
    }
  }
};
