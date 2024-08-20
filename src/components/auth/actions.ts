import { CredentialResponse } from "@react-oauth/google"
import { GoogleUser, isGoogleUser } from "./types"
import { jwtDecode } from "jwt-decode"

export const getGoogleUserData = (credential: CredentialResponse['credential']) => {

  const googleUserDecoded = jwtDecode(credential || '') as GoogleUser
  if (isGoogleUser(googleUserDecoded)) {
    return googleUserDecoded
  }
  throw Error("User decoding failed")
} 
