import { forwardRef, useImperativeHandle, useRef } from "react";
import { DialogBox } from "../utils/DialogBox";
import { GoogleLogin } from "@react-oauth/google";
import { getGoogleUserData } from "./actions";
import { updateUserLocalStorage, useUserContext } from "./context";
import { Button } from "../utils/Buttons";

type GoogleLoginDialog = {
  onSuccess?: () => void;
};

export const GoogleLoginDialog = forwardRef<
  HTMLDialogElement,
  GoogleLoginDialog
>(({ onSuccess }, ref) => {
  const { login, loggedIn, logout } = useUserContext();
  const innerRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => innerRef?.current as HTMLDialogElement, [
    innerRef,
  ]);
  return (
    <DialogBox
      title={loggedIn ? "Logout" : "Login"}
      ref={innerRef}
      className="grid grid-cols-2 gap-7 justify-center md:max-w-3/4 "
    >
      <Button
        onClick={
          () => innerRef?.current?.close()
        }>
        Cancel
      </Button>
      {loggedIn ? (
        <Button
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <div className="grid justify-center m-0">
          <GoogleLogin
            onSuccess={(crendentialResponse) => {
               const googleUser = getGoogleUserData(crendentialResponse?.credential || '') 
               login(googleUser);
               innerRef?.current?.close();
               updateUserLocalStorage(crendentialResponse.credential || '')
               onSuccess && onSuccess();
            }}
            onError={() => {
              console.log("Error while logging in");
            }}
          />
        </div>
      )}
    </DialogBox>
  );
});
