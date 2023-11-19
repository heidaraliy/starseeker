import { useState } from 'react';
import Icon from './Icon';
import modulo_explore from '../assets/datagaze_gaze_icon.png';
import modulo_usage from '../assets/datagaze_usage_icon.png';
import modulo_user from '../assets/datagaze_user_icon.png';
import modulo_settings from '../assets/datagaze_settings_icon.png';
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
        className={`fixed left-2 md:left-0 md:h-[25.5rem] md:w-40 w-52 z-100 tracking-tighter drop-shadow-2xl border-2 border-neutral-300 bg-indigo-50 rounded-br-md transform transition-transform duration-500 ${
          isSidebarOpen
            ? '-translate-x-6'
            : 'md:-translate-x-[8.2rem] -translate-x-[12.1rem]'
        }`}
      >
        {/* grid parent */}
        <div>
          {/* toggle icon */}
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <span className="absolute right-0 md:right-1 md:top-[11.5rem] top-[5.4rem] ml-3 z-100 text-2xl font-bold">
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
          <Link to="/prod/gaze/model_creator">
            <Icon title="Gaze" onClick={toggleSidebar} img={modulo_explore} />
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
