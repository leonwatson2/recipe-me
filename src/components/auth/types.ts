export type GoogleLoginRes = {
  access_token: string

}

export type GoogleUser = {
  given_name: string;
  family_name: string;
  name: string;
  picture: string;

}

export type User = {
  favorites: Array<string>;
}

export function isGoogleUser(user:GoogleUser): user is GoogleUser {
  if(
    typeof user === 'object' && 
  typeof user.given_name == "string" &&
  typeof user.family_name == "string" &&
  typeof user.given_name == "string" &&
  typeof user.picture == "string")
    return true
  return false
  
}
