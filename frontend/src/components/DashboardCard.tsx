import React, { ReactNode } from 'react';

interface DashboardCardProps {
  img: string;
  title: ReactNode;
  description: ReactNode;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  onClick,
  img,
}) => {
  return (
    <div
      className="lg:h-28 h-20 max-w-xl bg-indigo-50 border-2 border-neutral-400 flex flex-row mx-0 lg:mx-2 my-1 rounded-sm shadow-md hover:drop-shadow-lg hover:-translate-y-0.5 hover:bg-indigo-100 cursor-pointer active:translate-y-0.5 duration-200 ease-in-out"
      onClick={onClick}
    >
      <img src={img} alt="CardImage" className="lg:h-[6.75rem] h-18" />
      <div className="md:px-4 px-2">
        <div className="font-heebo text-neutral-950 text-lg drop-shadow-sm tracking-tighter md:my-2">
          {title}
        </div>
        <p className="font-heebo font-light text-neutral-800 md:text-base text-sm tracking-tighter">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
