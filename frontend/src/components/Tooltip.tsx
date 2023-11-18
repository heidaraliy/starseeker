import React from 'react';

interface TooltipProps {
  message: string;
  position: 'dropdown';
}

const Tooltip: React.FC<TooltipProps> = ({ children, message, position }) => {
  const positionStyles = {
    dropdown:
      'absolute -translate-y-full -translate-x-1/2 top-0 left-[24rem] mb-2',
    corner:
      'absolute -translate-y-full -translate-x-1/2 top-0 left-[8rem] mb-2',
  };

  return (
    <div className="relative group">
      {children}
      <span
        className={`absolute ${positionStyles[position]} tracking-tight text-sm w-72 p-2 m-2 font-heebo font-light text-center text-slate-900 bg-white border-2 border-gray-400 rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity delay-500 duration-300 ease-in-out pointer-events-none`}
      >
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
