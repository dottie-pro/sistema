import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

import { MdClose } from "react-icons/md";

export type ModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[500000]"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <DialogPanel className={`bg-white rounded-lg p-4 ${className}`}>
          <DialogTitle className="text-xl text-neutral-700 flex justify-between items-center">
            <h1>{title}</h1>
            <button onClick={() => setIsOpen(false)}>
              <MdClose />
            </button>
          </DialogTitle>
          <Description>{children}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
