import { useCallback, useRef } from "react";
import { useUserContext } from "../auth";
import { motion, Variants } from "framer-motion";
import { SVG } from "../../assets/SvgElements";
import { DialogBox } from "../../utils/components/DialogBox";
import { useDialogContext } from "../../utils/contexts/dialog-context";
import { Button } from "@Utils";

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
  },
  show: {
    x: 0,
    opacity: 1,
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
  const { setDialogOpen } = useDialogContext();
  const editButtonClick = () => {
    if (isNew && !updated) return;
    if (editing && updated) {
      dialogRef.current?.showModal();
      setDialogOpen(true);
    } else {
      toggleEditing();
    }
  };
  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    dialogRef.current?.close();
  }, [dialogRef.current]);
  const onConfirmClick = () => {
    setDialogOpen(false);
    closeDialog();
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
        transition={{ duration: 0.4 }}
        className="sticky w-full top-16 right-0 z-10"
        tabIndex={1}
        onClick={editButtonClick}
      >
        {isNew && (
          <SVG
            title="checkmark"
            className={
              "absolute right-10 transition-opacity duration-300 " +
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
            closeDialog();
          }}
        >
          Discard Changes
        </Button>
        <Button onClick={onConfirmClick}>Confirm</Button>
      </DialogBox>
    </>
  );
};
