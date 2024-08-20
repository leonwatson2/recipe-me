export type GoogleLoginRes = {
  access_token: string

}

export type GoogleUser = {
  given_name: string;
  family_name: string;
  name: string;
  picture: string;
  email: string;
}

export type User = {
  favorites: Array<string>;
  isAdmin: boolean;
}

export function isUser(user:User): user is User {
  if(user.favorites !== undefined 
      && user.isAdmin !== undefined)
    return true
  return false
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
