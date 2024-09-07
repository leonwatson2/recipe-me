import { FC } from "react";
import { SVG } from "../../assets/SvgElements";
import { useUserContext } from "../auth";

type ProfileButtonProps = {
  dialogRef?: React.RefObject<HTMLDialogElement>;
};
export const ProfileButton: FC<ProfileButtonProps> = ({ dialogRef }) => {
  const { googleUser } = useUserContext();
  //TODO: blur background on open const { setDialogOpen } = useDialogContext()
  return (
    <button
      className="my-auto"
      onClick={() => {
        if (dialogRef && dialogRef.current) {
          dialogRef.current.show();
        }
      }}
    >
      {googleUser?.picture ? (
        <div className="rounded-full overflow-hidden">
          <img src={googleUser.picture} className="scale-75" />
        </div>
      ) : (
        <SVG
          title="profile"
          className="h-12 w-12 border-4 rounded-full"
          svgClassName="h-9"
        />
      )}
    </button>
  );
};
