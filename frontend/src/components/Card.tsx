import React, { ReactNode } from 'react';

interface CardProps {
  img: string;
  title: ReactNode;
  description: ReactNode;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick, img }) => {
  return (
    <div
      className="lg:h-24 h-20 max-w-xl bg-indigo-50 border-2 border-gray-400 flex flex-row mx-0 lg:mx-2 my-1 rounded-sm shadow-md hover:drop-shadow-lg hover:-translate-y-0.5 hover:bg-indigo-100 cursor-pointer active:translate-y-0.5 duration-200 ease-in-out"
      onClick={onClick}
    >
      <img src={img} alt="CardImage" className="lg:h-[5.75rem] h-18" />
      <div className="md:px-4 px-2">
        <div className="font-heebo text-gray-950 text-lg drop-shadow-sm tracking-tighter md:my-1">
          {title}
        </div>
        <p className="font-heebo font-light text-gray-800 md:text-base text-sm tracking-tighter">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
