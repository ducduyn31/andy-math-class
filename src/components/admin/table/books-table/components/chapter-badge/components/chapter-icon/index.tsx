import React from "react";
import { useToggle } from "react-use";

interface Props extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  onDropdownToggle?: () => void;
}

export const DropdownIcon: React.FC<Props> = ({
  stroke,
  fill,
  strokeWidth,
  onDropdownToggle,
  ...rest
}) => {
  const [dropdown, toggleDropdown] = useToggle(false);

  const toggle = () => {
    toggleDropdown();
    onDropdownToggle?.();
  };

  if (dropdown) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        onClick={toggle}
        {...rest}
      >
        <polyline
          points="15,20 25,30 35,20"
          stroke={stroke || "#000"}
          strokeWidth={strokeWidth || 4}
          fill={fill || "none"}
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      onClick={toggle}
      {...rest}
    >
      <polyline
        points="20,15 30,25 20,35"
        stroke={stroke || "#000"}
        strokeWidth={strokeWidth || 4}
        fill={fill || "none"}
      />
    </svg>
  );
};
