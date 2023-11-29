import React, { useEffect, useState } from 'react';
import google_refresh from '../assets/google_refresh.svg';
import google_question_mark from '../assets/google_question_mark.svg';
import ModelCreatorDropdown from './ModelCreatorDropdown';
import PackageSelector from './PackageSelector';
import Tooltip from './Tooltip';
import { forecastTypeOptions, forecastToIcon } from '../consts/forecastTypes';
import { packageToModelsMap, modelToIcon } from '../consts/modelTypes';
import {
  programmingLanguageOptions,
  languageToIcon,
} from '../consts/languageTypes';
import { getTooltipMessage } from '../utils/getTooltipMessage';
import AuxiliaryModelCreatorWidget from './AuxiliaryModelCreatorWidget';

const ModelCreatorWidget: React.FC = () => {
  //set key for packageSelectorKey so we can refresh it to default when a user clicks the refresh button
  const [packageSelectorKey, setPackageSelectorKey] = useState(0);

  //also need to process package selection to render available models
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [filteredModelOptions, setFilteredModelOptions] = useState([]);

  const handlePackageSelect = (selectedPackages: string[]) => {
    setSelectedPackages(selectedPackages);
  };

  //forecast type selection consts, states, and handling
  const [selectedForecast, setSelectedForecast] = useState<string | null>('');

  const handleForecastSelect = (forecast: string) => {
    setSelectedForecast(forecast);
  };

  //programming language selection consts, states, and handling
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setSelectedPackages([]);
    setSelectedModel('');
  };

  //model type selection consts, states, and handling
  const [selectedModel, setSelectedModel] = useState<string | null>('');

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  //handling the user clicking refresh -- this resets all fields to default
  const handleModelCreatorRefresh = () => {
    setSelectedLanguage('');
    setSelectedForecast('');
    setSelectedModel('');
    setPackageSelectorKey((prevKey) => prevKey + 1);
  };

  //overlay blur for package selector
  const showModelCreator = !selectedForecast || !selectedLanguage;

  //useEffect for rendering models conditionally
  useEffect(() => {
    const modelsSet = new Set();
    let modelOptionsAvailable = false;

    if (selectedPackages.length > 0) {
      selectedPackages.forEach((pkg) => {
        const modelsForPackage = packageToModelsMap[pkg] || [];
        modelsForPackage.forEach((model) => {
          modelsSet.add(model);
          modelOptionsAvailable = true;
        });
      });
    }

    const newFilteredModelOptions = modelOptionsAvailable
      ? [...modelsSet]
      : [
          'No models available for selection. Please select your options above!',
        ];

    setFilteredModelOptions(newFilteredModelOptions);

    if (!modelsSet.has(selectedModel)) {
      setSelectedModel(null);
    }
  }, [selectedPackages, selectedModel]);

  return (
    <div className="flex md:flex-col xl:flex-row xl:-space-x-0.5">
      <div className="bg-neutral-50 md:w-[42rem] xl:w-[36rem] 2xl:w-[44rem] drop-shadow-2xl z-10">
        <div className="border-2 border-black h-[44.5rem]">
          <div className="drop-shadow-xl flex flex-row font-heebo border-b-2 border-black bg-neutral-400 h-[2rem] justify-between items-center">
            <div>
              <span className="material-symbols-outlined m-2">terminal</span>
              <span className="relative drop-shadow-md text-[1.1rem] font-bold -top-1.5 -left-0.5 tracking-tighter">
                model_creator.exe
              </span>
            </div>
            <Tooltip
              message="Use this button to reset the Model Creator."
              position="corner"
            >
              <img
                src={google_refresh}
                className="m-2 drop-shadow-md cursor-pointer hover:-rotate-12 active:-rotate-45 transition duration-200"
                onClick={handleModelCreatorRefresh}
              />
            </Tooltip>
          </div>
          <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
            <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
              info
            </span>
            Select forecast data type:
          </div>
          <ModelCreatorDropdown
            iconPlaceholder={google_question_mark}
            iconImage={forecastToIcon[selectedForecast] || google_question_mark}
            options={forecastTypeOptions}
            onSelect={handleForecastSelect}
            placeholder="Select a forecast data type."
            currentSelection={selectedForecast || ''}
            tooltipType="forecastType"
            getTooltipMessage={getTooltipMessage}
          />
          <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
            <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
              info
            </span>
            Select model language:
          </div>
          <ModelCreatorDropdown
            iconPlaceholder={google_question_mark}
            iconImage={languageToIcon[selectedLanguage] || google_question_mark}
            options={programmingLanguageOptions}
            onSelect={handleLanguageSelect}
            placeholder="Select a language."
            currentSelection={selectedLanguage || ''}
            tooltipType="languageType"
            getTooltipMessage={getTooltipMessage}
          />
          <div
            className={`tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2 ${
              showModelCreator ? 'blur' : ''
            }`}
          >
            <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
              info
            </span>
            Select packages:
          </div>
          <div className={`${showModelCreator ? 'blur' : ''}`}>
            <PackageSelector
              key={packageSelectorKey}
              selectedLanguage={selectedLanguage}
              onPackageSelect={handlePackageSelect}
            />
          </div>
          <span
            className={`package-selector ${
              showModelCreator
                ? 'absolute flex justify-center top-[22rem] left-0 right-0 bottom-0 font-heebo font-light tracking-tighter text-lg text-center max-w-sm max-h-16 mx-auto border-2 border-black bg-neutral-200 shadow-2xl rounded-sm'
                : 'hidden'
            }`}
          >
            <span className="absolute -left-4 -top-4 text-2xl">⚠️</span>
            Please select your forecast data type and model language above to
            continue!
          </span>
          <div className={`package-selector ${showModelCreator ? 'blur' : ''}`}>
            <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
              <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
                info
              </span>
              Select model type:
            </div>
            <ModelCreatorDropdown
              iconPlaceholder={google_question_mark}
              iconImage={modelToIcon[selectedModel] || google_question_mark}
              options={filteredModelOptions}
              onSelect={handleModelSelect}
              placeholder="Select a model type."
              currentSelection={selectedModel || ''}
              tooltipType="modelType"
              getTooltipMessage={getTooltipMessage}
            />
          </div>
        </div>
      </div>
      <AuxiliaryModelCreatorWidget
        selectedModel={selectedModel}
        selectedLanguage={selectedLanguage}
        selectedForecast={selectedForecast}
        selectedPackages={selectedPackages}
      />
    </div>
  );
};

export default ModelCreatorWidget;
