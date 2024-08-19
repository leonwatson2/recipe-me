import { CredentialResponse } from "@react-oauth/google"
import { GoogleUser, isGoogleUser } from "./types"
import { jwtDecode } from "jwt-decode"

export const getGoogleUserData = async (user: CredentialResponse)  => {

  const googleUserDecoded = jwtDecode(user?.credential || '') as GoogleUser
  if (isGoogleUser(googleUserDecoded )) {
    return googleUserDecoded
  }
  throw Error("User decoding failed")
} 
