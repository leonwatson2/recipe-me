import { forwardRef, useImperativeHandle, useRef } from "react";
import { DialogBox } from "../utils/DialogBox";
import { GoogleLogin } from "@react-oauth/google";
import { getGoogleUserData } from "./actions";
import { useUserContext } from "./context";
import { Button } from "../utils";

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
            onSuccess={async (crendentialResponse) => {
              await getGoogleUserData(crendentialResponse)
                .then((googleUser) => {
                  login(googleUser);
                  innerRef?.current?.close();
                  onSuccess && onSuccess();
                })
                .catch((e) => console.log(e));
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
