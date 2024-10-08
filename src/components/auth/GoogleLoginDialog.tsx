import { forwardRef, useImperativeHandle, useRef } from "react";
import { DialogBox } from "../../utils/components/DialogBox";
import { GoogleLogin } from "@react-oauth/google";
import { getGoogleUserData } from "./actions";
import { updateUserLocalStorage, useUserContext } from "./context";
import { Button } from "@utils";
import { useDialogContext } from "../../utils/contexts/dialog-context";

type GoogleLoginDialog = {
  onSuccess?: () => void;
};

export const GoogleLoginDialog = forwardRef<
  HTMLDialogElement,
  GoogleLoginDialog
>(({ onSuccess }, ref) => {
  const { login, loggedIn, logout } = useUserContext();
  const { setDialogOpen } = useDialogContext();
  const innerRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => innerRef?.current as HTMLDialogElement, [
    innerRef,
  ]);
  return (
    <DialogBox
      title={loggedIn ? "Logout" : "Login"}
      ref={innerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4 justify-center md:max-w-3/4 "
    >
      <Button
        onClick={() => {
          innerRef?.current?.close();
          setDialogOpen(false);
        }}
      >
        Cancel
      </Button>
      {loggedIn ? (
        <Button
          onClick={() => {
            setDialogOpen(false);
            innerRef?.current?.close();
            logout();
          }}
        >
          Logout
        </Button>
      ) : (
        <div className="grid justify-center m-0">
          <GoogleLogin
            onSuccess={(crendentialResponse) => {
              const googleUser = getGoogleUserData(
                crendentialResponse?.credential || "",
              );
              login(googleUser);
              innerRef?.current?.close();
              setDialogOpen(false);
              updateUserLocalStorage(crendentialResponse.credential || "");
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
