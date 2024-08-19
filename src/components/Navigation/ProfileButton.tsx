import { FC } from "react";
import { SVG } from "../../assets/SvgElements";

type ProfileButtonProps = {
  dialogRef?: React.RefObject<HTMLDialogElement>;
};
export const ProfileButton: FC<ProfileButtonProps> = ({ dialogRef  }) => {
  return (
    <button
      onClick={() => {
        if (dialogRef && dialogRef.current) {
          dialogRef.current.show();
        }
      }}
    >
      <SVG
        title="profile"
        className="h-12 w-12 border-4 rounded-full"
        svgClassName="h-9"
      />
    </button>
  );
};
