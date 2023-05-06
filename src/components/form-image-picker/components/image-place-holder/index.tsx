import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {}

export const ImagePlaceHolder: React.FC<Props> = (props) => {
  return (
    <button
      className=" border-dashed rounded w-32 h-32 border-8 flex justify-center items-center"
      {...props}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-2/3 h-2/3 text-gray-400"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    </button>
  );
};
