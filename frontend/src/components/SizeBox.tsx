import React from "react";

interface SizeBoxProps {
  size: string;
  selected: boolean;
  disabled?: boolean;
  onClick: (size: string) => void
}

const SizeBox: React.FC<SizeBoxProps> = ({ size, selected, disabled, onClick }) => {
  return (<button className={`border rounded-sm px-[18px] py-[10px] mr-[8px] mb-[8px]
        font-medium transition-all duration-200
        ${selected
      ? 'border-black bg-black text-white'
      : 'border-[#ccc] bg-white text-[#222] hover:border-black'
    }
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`} disabled={disabled} onClick={() => onClick(size)} type="button">
    {size}
  </button>)
};

export default SizeBox;
