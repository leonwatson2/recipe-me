import { Outlet } from "react-router-dom";
import { MainNav } from "./Navigation";
import { SvgElements } from "../assets/SvgElements";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "../firebase/config";
import { UserContext, UserContextType, useUser } from "./auth";
export function Root() {

  const userContext: UserContextType = useUser()
  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
      <UserContext.Provider value={userContext} >
        <div className="dark">
        <MainNav />
        <SvgElements />
        <Outlet />
        </div>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Root;
