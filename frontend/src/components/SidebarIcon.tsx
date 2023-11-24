import React, { ReactNode } from 'react';

interface SidebarIconProps {
  img: string;
  title: ReactNode;
  onClick: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ title, onClick, img }) => {
  return (
    <div
      className="flex flex-col justify-center rounded-full md:w-36 hover:-translate-y-0.5 hover:drop-shadow-lg active:translate-y-0 duration-200"
      onClick={onClick}
    >
      <img
        src={img}
        className="h-12 w-12 bg-black border-black border-2 rounded-full my-2 mx-auto drop-shadow-md cursor-pointer"
      />
      <p className="block mx-auto text-center font-heebo font-bold cursor-pointer text-base md:text-lg text-indigo-950">
        {title}
      </p>
    </div>
  );
};

export default SidebarIcon;
