import { Outlet } from "react-router-dom";
import { MainNav } from "./Navigation";
import { SVG, SvgElements } from "../assets/SvgElements";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "../firebase/config";
import { UserContext, UserContextType, useUser } from "./auth";
import {
  DialogContext,
  useDialogState,
} from "../utils/contexts/dialog-context";
import { Suspense } from "react";

export function Root() {
  const userContext: UserContextType = useUser();
  const { setDialogOpen, isDialogOpen } = useDialogState();
  return (

    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
      <UserContext.Provider value={userContext}>
        <DialogContext.Provider value={{ setDialogOpen, isDialogOpen }}>
          <div
            className={`dark transition duration-400 ${isDialogOpen ? "blur-lg" : ""}`}
          >
            <MainNav />
            <SvgElements />
            <Suspense fallback={<SVG title="yummm" />}>
            { userContext.loadingUser ? <SVG title="smsMonochrome" className="fill-primary m-auto animate-pulse"  height={100} width={100}/> : <Outlet />} 
            </Suspense>
         </div>
        </DialogContext.Provider>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Root;
