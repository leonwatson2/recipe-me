import { createContext, useContext, useState } from "react";
type DialogContextType = {
  setDialogOpen: (open: boolean) => void;
  isDialogOpen: boolean;
};
export const DialogContext = createContext<DialogContextType>({
  setDialogOpen: () => { },
  isDialogOpen: false,
});

export const useDialogContext = () => useContext(DialogContext);
export const useDialogState = () => {
  const [isOpen, open] = useState<boolean>(false);

  return { setDialogOpen: open, isDialogOpen: isOpen };
};
