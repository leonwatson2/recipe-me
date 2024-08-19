import { forwardRef } from "react";
import { DialogBox } from "../utils/DialogBox";
import { GoogleLogin } from "@react-oauth/google";
import { getGoogleUserData } from "./actions";
import { useUser } from "./context";

type GoogleLoginDialog = {
  setError: (error: string) => void
};

export const GoogleLoginDialog = forwardRef<HTMLDialogElement, GoogleLoginDialog>((
  { setError },
  ref,
) => {
  const { login, loggedIn, logout } = useUser()

  
  return (
    <DialogBox
      title="Login"
      ref={ref}
      className="grid grid-cols-1 justify-center md:max-w-3/4 "
    >
    <div className="grid justify-center m-0 pb-10">
    { loggedIn ? 
        <button className="button bg-lbrown h-12 w-32 drop-shadow-md" onClick={logout}> Logout </button>
        : 
        <GoogleLogin
          onSuccess={(crendentialResponse) => {
            getGoogleUserData(crendentialResponse).then((googleUser)=>{
              login(googleUser)
            }).catch(e=>console.log(e))

            }
          }
        onError={() => {
          setError("Error while logging in");
        }}
        />} 
        </div>
        </DialogBox>
  );
})
