import React, { useState, useEffect, useRef } from 'react';
import Tooltip from './Tooltip';

interface ModelCreatorDropdownProps {
  iconImage: Partial<string>;
  iconPlaceholder: Partial<string>;
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder: string;
  currentSelection: string;
  tooltipType: string;
  getTooltipMessage: (option: string, type: string) => string;
}

const ModelCreatorDropdown: React.FC<ModelCreatorDropdownProps> = ({
  iconPlaceholder,
  iconImage,
  options,
  onSelect,
  placeholder,
  currentSelection,
  tooltipType,
  getTooltipMessage,
}) => {
  // shitty pagination method but dropdowns don't look pleasing otherwise
  const [currentPage, setCurrentPage] = useState(1);
  const optionsPerPage = 5;
  const indexOfLastOption = currentPage * optionsPerPage;
  const indexOfFirstOption = indexOfLastOption - optionsPerPage;
  const currentOptions = options.slice(indexOfFirstOption, indexOfLastOption);
  const totalPages = Math.ceil(options.length / optionsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // show/hide dropdown functionality
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // handle selections
  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    onSelect(option);
  };

  // dropdown direction logic -- keeps pages clean!
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateDropdownDirection = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setOpenUp(spaceBelow < 250);
      }
    };
    updateDropdownDirection();
    window.addEventListener('resize', updateDropdownDirection);

    return () => window.removeEventListener('resize', updateDropdownDirection);
  }, []);

  return (
    <div className="relative m-3 mx-6">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer bg-neutral-200 hover:bg-neutral-300 border-2 border-black font-heebo tracking-tighter text-sm drop-shadow-lg p-2 flex justify-between items-center h-8 hover:drop-shadow-xl duration-200 ease-in-out transition"
        ref={dropdownRef}
      >
        <span className="flex flex-row">
          {currentSelection ? (
            <>
              <span>
                <img src={iconImage} className="h-6 mr-1 -ml-1" />{' '}
              </span>
              <span className="mb-1 ml-1">{currentSelection}</span>
            </>
          ) : (
            <>
              <span>
                <img src={iconPlaceholder} className="h-6 mr-1 -ml-1" />
              </span>
              <span className="mb-1 ml-1">{placeholder}</span>
            </>
          )}
        </span>
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div
          className={`z-40 absolute ${
            openUp
              ? 'bottom-[4.1rem] md:left-[18.74rem] 2xl:left-[20.75rem] xl:left-[12.74rem]'
              : 'top-[1.87rem]'
          } left-0 bg-neutral-50 border-2 border-black shadow-2xl w-[20rem]`}
        >
          <ul className="max-h-[13.9rem] relative">
            {currentOptions.map((option, index) => (
              <Tooltip
                key={index}
                message={getTooltipMessage(option, tooltipType)}
                position="dropdown"
              >
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer hover:bg-neutral-100 p-2 font-heebo text-sm flex justify-between items-center"
                >
                  <span className="flex-1">{option}</span>
                </li>
              </Tooltip>
            ))}
            {options.length > 0 && (
              <div className="absolute -inset-x-0.5 -bottom-8.9 flex justify-between items-center px-2 bg-neutral-200 border-black border-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? ''
                      : 'active:-translate-x-0.5 duration-200'
                  }
                >
                  <span className="material-symbols-outlined scale-150 pt-1">
                    arrow_left
                  </span>
                </button>
                <span className="font-heebo text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? ''
                      : 'active:translate-x-0.5 duration-200'
                  }
                >
                  <span className="material-symbols-outlined scale-150 pt-1">
                    arrow_right
                  </span>
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModelCreatorDropdown;
