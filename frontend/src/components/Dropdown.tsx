import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface DropdownProps {
  iconImage: Partial<string>;
  iconPlaceholder: Partial<string>;
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder: string;
  currentSelection: string;
  getToolTipMessage: (option: string) => string;
}

const Dropdown: React.FC<DropdownProps> = ({
  iconPlaceholder,
  iconImage,
  options,
  onSelect,
  placeholder,
  currentSelection,
  getToolTipMessage,
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

  return (
    <div className="relative m-2 mx-6">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer bg-stone-200 hover:bg-stone-300 border-2 border-black font-JetBrains tracking-tighter text-sm drop-shadow-lg p-2 flex justify-between items-center h-8 hover:drop-shadow-xl duration-200 ease-in-out transition"
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
        <div className="z-40 absolute top-[1.87rem] left-0 bg-white border-2 border-black shadow-lg w-[20rem]">
          <ul className="max-h-[13.9rem] relative">
            {currentOptions.map((option, index) => (
              <Tooltip
                key={index}
                message={getToolTipMessage(option)}
                position="dropdown"
              >
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer hover:bg-gray-100 p-2 font-JetBrains text-sm flex justify-between items-center"
                >
                  <span className="flex-1">{option}</span>
                </li>
              </Tooltip>
            ))}
            {options.length > 5 && (
              <div className="absolute -inset-x-0.5 -bottom-8.9 flex justify-between items-center px-2 bg-stone-200 border-black border-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? ''
                      : 'active:-translate-x-0.5 duration-100'
                  }
                >
                  <span className="material-symbols-outlined scale-150 pt-1">
                    arrow_left
                  </span>
                </button>
                <span className="font-JetBrains">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? ''
                      : 'active:translate-x-0.5 duration-100'
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

export default Dropdown;
