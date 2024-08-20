import { forwardRef, useImperativeHandle, useRef } from "react";
import { DialogBox } from "../utils/DialogBox";
import { GoogleLogin } from "@react-oauth/google";
import { getGoogleUserData } from "./actions";
import { useUserContext } from "./context";

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
      className="grid grid-cols-1 justify-center md:max-w-3/4 "
    >
      <div className="grid justify-center m-0 pb-10">
        {loggedIn ? (
          <button
            className="button bg-lbrown h-12 w-32 drop-shadow-md"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin
            onSuccess={(crendentialResponse) => {
              getGoogleUserData(crendentialResponse)
                .then((googleUser) => {
                  login(googleUser);
                  onSuccess && onSuccess();
                })
                .catch((e) => console.log(e));
              innerRef?.current?.close();
            }}
            onError={() => {
              console.log("Error while logging in");
            }}
          />
        )}
      </div>
    </DialogBox>
  );
});
