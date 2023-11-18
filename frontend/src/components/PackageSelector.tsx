import { useState } from 'react';
import Tooltip from './Tooltip';
import { packageTooltips, placeholderText } from '../consts/packageTooltips';

const PackageSelector = () => {
  const [availablePackages, setAvailablePackages] = useState([
    'Optuna',
    'scikit-learn',
    'Keras',
    'TensorFlow',
    'tidymodels',
    'statsmodels',
  ]);
  const [selectedPackages, setSelectedPackages] = useState([]);

  const [hoveredPackage, setHoveredPackage] = useState({
    name: '',
    description: '',
  });

  const addPackage = (pkg) => {
    setSelectedPackages((currentSelected) => [...currentSelected, pkg]);
    setAvailablePackages((currentAvailable) =>
      currentAvailable.filter((p) => p !== pkg)
    );
  };

  const removePackage = (pkg) => {
    setAvailablePackages((currentAvailable) => [...currentAvailable, pkg]);
    setSelectedPackages((currentSelected) =>
      currentSelected.filter((p) => p !== pkg)
    );
  };

  const handleMouseEnter = (pkg) => {
    setHoveredPackage({ name: pkg, description: packageTooltips[pkg] });
  };

  const handleMouseLeave = () => {
    setHoveredPackage({ name: '', description: '' });
  };

  return (
    <div>
      <div>
        <div className="flex flex-row justify-center items-center h-[16rem] m-2 mx-6 border-2 border-black bg-stone-200 divide-x-[0.1rem] divide-black">
          <div className="flex flex-col w-1/2 h-full justify-start overflow-auto">
            <h2 className="text-center tracking-tighter font-heebo py-1 lg:text-base text-sm font-bold bg-stone-300 mb-2 border-b-[0.1rem] border-black">
              Available Packages
            </h2>
            {availablePackages.map((pkg) => (
              <div key={pkg} className="flex mb-1 mx-4 border-2 border-black">
                <button
                  className="flex-grow h-6 text-slate-900 tracking-tighter font-JetBrains text-sm bg-stone-50 hover:bg-stone-100 focus:outline-none duration-300 transition ease-in-out"
                  onClick={() => addPackage(pkg)}
                  onMouseEnter={() => handleMouseEnter(pkg)}
                  onMouseLeave={handleMouseLeave}
                >
                  {pkg}
                </button>
                <button
                  className="flex h-6 text-slate-900 tracking-tighter font-JetBrains bg-gray-400 hover:bg-gray-500 focus:outline-none duration-200 transition ease-in-out"
                  onClick={() => addPackage(pkg)}
                  onMouseEnter={() => handleMouseEnter(pkg)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="material-symbols-outlined">arrow_right</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-1/2 h-full justify-start overflow-auto">
            <h2 className="text-center tracking-tighter font-heebo py-1 lg:text-base text-sm font-bold bg-stone-300 mb-2 border-b-[0.1rem] border-black">
              Selected Packages
            </h2>
            {selectedPackages.map((pkg) => (
              <div key={pkg} className="flex mb-1 mx-4 border-2 border-black">
                <button
                  className="h-6 text-slate-900 font-JetBrains tracking-tighter bg-gray-400 hover:bg-gray-500 focus:outline-none duration-200 transition ease-in-out"
                  onClick={() => removePackage(pkg)}
                >
                  <span className="material-symbols-outlined">arrow_left</span>
                </button>
                <button
                  className="flex-grow h-6 text-slate-900 font-JetBrains tracking-tighter text-sm bg-stone-50 hover:bg-stone-100 focus:outline-none duration-200 transition ease-in-out"
                  onClick={() => removePackage(pkg)}
                >
                  {pkg}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="font-heebo tracking-tighter flex flex-col bg-stone-100 mx-auto -mt-2.5 p-2 border-2 border-black md:w-[38rem] xl:w-[32rem] 2xl:w-[40rem] h-[6rem] shadow-lg">
        {hoveredPackage.name ? (
          <Tooltip message={hoveredPackage.description} position="dropdown">
            <div>
              <span className="flex text-lg drop-shadow-md">
                {hoveredPackage.name}
              </span>
              <span className="font-light text-base">
                {hoveredPackage.description}
              </span>
            </div>
          </Tooltip>
        ) : (
          <div>
            <span className="flex text-lg drop-shadow-md">
              Package Selector
            </span>
            <span className="font-light text-base">{placeholderText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelector;
