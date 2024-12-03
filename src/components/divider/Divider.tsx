import React from "react";

interface DividerProps {
    color?: string;
    thickness?: string;
    margin?: string;
    height?: string;
}

export const Divider: React.FC<DividerProps> = ({
    color = "slate-200",
    thickness = "4",
    margin = "0",
    height = '1px'
}) => {

    return (
        <div
          className={`border-t-${thickness} h-[${height}] bg-${color} w-full my-${margin}`}
          aria-hidden="true"
        />
      );
};
