import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useLockBodyScroll } from "src/hooks/utils";
import CloseIcon from "@/components/common/icons/close";

interface ModalWrapperProps {
  isBig?: boolean;
  title: string;
  children?: React.ReactNode;
  handleCloseModal: () => void;
}

const ModalWrapper = ({
  children,
  title,
  handleCloseModal,
  isBig,
}: ModalWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useLockBodyScroll();

  if (!isMounted) return null;

  return createPortal(
    <div className="z-1">
      <div
        className="bg-neutral-800 opacity-80 fixed inset-0 z-10"
        onClick={(e) => {
          e.stopPropagation();
          handleCloseModal();
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          [
            "fixed p-10 bg-white z-[10] inset-0  m-auto rounded-lg overflow-y-scroll dark:bg-primary-dark-100",
          ],
          !isBig && "h-fit max-w-2xl max-h-[90vh]",
          isBig &&
            "max-w-[900px] mx-auto mt-10 inset-0 rounded-b-none max-h-[1000px]"
        )}
      >
        <div className="flex justify-between items-center ">
          <div className="font-poppins font-semibold ">{title}</div>
          <button
            className="cursor-pointer flex justify-center items-center"
            onClick={handleCloseModal}
          >
            <CloseIcon />
            {/* <Image
              src="/icons/close.png"
              width="20"
              height="20"
              layout="fixed"
              alt="close modal"
            /> */}
          </button>
        </div>
        <hr className="mt-3 mb-10" />
        <div className="">{children}</div>
      </div>
    </div>,
    document.querySelector("#modal") as HTMLElement
  );
};

export default ModalWrapper;