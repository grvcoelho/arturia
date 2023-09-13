import React from "react";

type DisplayProps = {
  text: string;
};

export const Display: React.FC<DisplayProps> = ({ text = "" }) => (
  <div className="mt-[23px] w-[46px] overflow-hidden overflow-ellipsis rounded-sm bg-stone-800 px-[4px] py-[4px] text-center font-mono text-[4px] text-white">
    {text}
  </div>
);
