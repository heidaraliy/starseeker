import { useState } from 'react';
import Icon from './Icon';
import modulo_explore from '../assets/modulo_explore_icon.svg';
import modulo_usage from '../assets/modulo_usage_icon.svg';
import modulo_user from '../assets/modulo_user_icon.svg';
import modulo_settings from '../assets/modulo_settings_icon.svg';
import { Link } from 'react-router-dom';

const AppSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="z-50">
      {/* sidebar */}
      <div
        className={`tracking-tighter drop-shadow-2xl border-2 border-gray-300 bg-white rounded-br-lg md:w-40 transform transition-transform duration-500 ease-in-out z-100 ${
          isSidebarOpen
            ? '-translate-x-6'
            : 'md:-translate-x-[8.2rem] -translate-x-[12.1rem]'
        } fixed left-2 md:left-0 md:h-[25rem] md:w-40 w-52 bg-white z-50`}
      >
        {/* grid parent */}
        <div>
          {/* Caret icon to toggle the sidebar */}
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <span className="absolute right-0 md:right-1 md:top-[11rem] top-[5.4rem] ml-3 z-100 text-2xl font-bold">
              {isSidebarOpen ? (
                <span className="material-symbols-outlined">
                  drag_indicator
                </span>
              ) : (
                <span className="material-symbols-outlined">
                  drag_indicator
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 mr-3 my-2 p-2 z-100">
          {/* icon 1 */}
          <Link to="app/gaze/model_creator">
            <Icon title="Gaze™" onClick={toggleSidebar} img={modulo_explore} />
          </Link>
          {/* icon 2 */}
          <Icon title="Usage" onClick={toggleSidebar} img={modulo_usage} />
          {/* icon 3 */}
          <Icon title="User" onClick={toggleSidebar} img={modulo_user} />
          {/* icon 4 */}
          <Icon
            title="Settings"
            onClick={toggleSidebar}
            img={modulo_settings}
          />
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
