import { useRef } from "react";
import { useUserContext } from "../../auth";
import { motion, Variants } from "framer-motion";
import { SVG } from "../../../assets/SvgElements";
import { Button } from "./buttons";
import { DialogBox } from "../DialogBox";

type EditingButtonProps = {
  toggleEditing: () => void;
  editing: boolean;
  updated: boolean;
  isNew: boolean;
  onConfirmUpdate: () => void;
};
const editButtonAnimation: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
    rotateZ: "90deg",
  },
  show: {
    x: 0,
    opacity: 1,
    rotateZ: "0",
  },
};
export const EditingButton = ({
  isNew,
  editing,
  updated,
  toggleEditing,
  onConfirmUpdate,
}: EditingButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { loggedIn } = useUserContext();
  const editButtonClick = () => {
    if (isNew && !updated) return;
    if (editing && updated) {
      dialogRef.current?.showModal();
    } else {
      toggleEditing();
    }
  };
  const onConfirmClick = () => {
    dialogRef.current?.close();
    toggleEditing();
    onConfirmUpdate();
  };
  if (!loggedIn) return <></>;
  return (
    <>
      <motion.button
        variants={editButtonAnimation}
        initial={"hidden"}
        animate={"show"}
        transition={{ duration: .4 }}
        className="absolute top-10 right-0"
        tabIndex={1}
        onClick={editButtonClick}
      >
        {isNew && (
          <SVG
            title="checkmark"
            className={
              "transition-opacity duration-300 " +
              (updated ? "opacity-100" : "opacity-0 cursor-default")
            }
            tabIndex={updated ? 0 : -1}
            height={40}
            width={40}
          ></SVG>
        )}
        {!isNew && (
          <SVG
            className={`absolute right-10 transition-opacity duration-300 
            ${editing ? "opacity-100" : "opacity-0 cursor-default"}`}
            title="checkmark"
            tabIndex={editing ? 0 : -1}
            height={40}
            width={40}
          ></SVG>
        )}

        <SVG
          title="arrow-down"
          svgClassName="fill-brown"
          className={`absolute right-10 transition-opacity duration-300 
            ${editing ? "opacity-0 cursor-default" : "opacity-100"}`}
          tabIndex={editing ? -1 : 0}
          height={40}
          width={40}
        ></SVG>
      </motion.button>
      <DialogBox
        title={"Save Changes"}
        className="grid grid-cols-2 gap-2"
        ref={dialogRef}
      >
        <Button
          onClick={() => {
            if (!isNew) toggleEditing();
            dialogRef.current?.close();
          }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirmClick}>Confirm</Button>
      </DialogBox>
    </>
  );
};
