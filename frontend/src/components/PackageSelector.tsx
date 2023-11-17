import React, { useState } from 'react';
import Tooltip from './Tooltip';

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

  const packageDescriptions = {
    Optuna:
      'An open-source hyperparameter optimization framework that automates the process of finding the most effective parameters for machine learning models.',
    'scikit-learn':
      'A versatile library for machine learning and data mining that provides simple and efficient tools for data analysis and modeling.',
    Keras:
      'A high-level neural networks API designed for human beings, not machines, promoting quick experimentation with deep learning.',
    TensorFlow:
      'An end-to-end open-source platform for machine learning that enables researchers to experiment and deploy AI models with ease.',
    tidymodels:
      'A collection of packages for modeling and machine learning that share underlying design principles, grammar, and data structures.',
    statsmodels:
      'A comprehensive Python module that allows users to explore data, estimate statistical models, and perform statistical tests with a wide array of functions.',
  };
  const [hoveredPackage, setHoveredPackage] = useState({
    name: '',
    description: '',
  });
  const placeholderText =
    'Hover over a package to learn about its functionality.';

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
    setHoveredPackage({ name: pkg, description: packageDescriptions[pkg] });
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
      <div className="font-heebo tracking-tighter flex flex-col bg-stone-100 mx-auto -mt-2.5 p-2 border-2 border-black w-11/12 h-[6rem] shadow-lg">
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
