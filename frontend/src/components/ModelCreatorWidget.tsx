import React, { useState } from 'react';
import google_refresh from '../assets/google_refresh.svg';
import google_question_mark from '../assets/google_question_mark.svg';
import Dropdown from './Dropdown';
import PackageSelector from './PackageSelector';
import Tooltip from './Tooltip';
import { forecastTypeOptions, forecastToIcon } from '../consts/forecastTypes';
import { modelTypeOptions, modelToIcon } from '../consts/modelTypes';
import {
  programmingLanguageOptions,
  languageToIcon,
} from '../consts/languageTypes';
import { getTooltipMessage } from '../utils/getTooltipMessage';

const ModelCreatorWidget: React.FC = () => {
  //set key for packageSelectorKey so we can refresh it to default when a user clicks the refresh button.
  const [packageSelectorKey, setPackageSelectorKey] = useState(0);

  //programming language selection consts, states, and handling.
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  //data type selection consts, states, and handling.
  const [selectedForecast, setSelectedForecast] = useState<string | null>('');

  const handleForecastSelect = (forecast: string) => {
    setSelectedForecast(forecast);
  };

  //model type selection consts, states, and handling.
  const [selectedModel, setSelectedModel] = useState<string | null>('');

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  //handling the user clicking refresh -- this resets all fields to default.
  const handleModelCreatorRefresh = () => {
    setSelectedLanguage('');
    setSelectedForecast('');
    setSelectedModel('');
    setPackageSelectorKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="bg-gray-50 md:w-[42rem] xl:w-[36rem] 2xl:w-[44rem] drop-shadow-2xl">
      <div className="border-2 border-black h-[41.5rem]">
        <div className="drop-shadow-xl flex flex-row font-JetBrains border-b-2 border-black bg-stone-300 h-[2rem] justify-between items-center">
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
          Select model language:
        </div>
        <Dropdown
          iconPlaceholder={google_question_mark}
          iconImage={languageToIcon[selectedLanguage] || google_question_mark}
          options={programmingLanguageOptions}
          onSelect={handleLanguageSelect}
          placeholder="Select a language."
          currentSelection={selectedLanguage || ''}
          tooltipType="languageType"
          getTooltipMessage={getTooltipMessage}
        />
        <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
          Select forecast type:
        </div>
        <Dropdown
          iconPlaceholder={google_question_mark}
          iconImage={forecastToIcon[selectedForecast] || google_question_mark}
          options={forecastTypeOptions}
          onSelect={handleForecastSelect}
          placeholder="Select a forecast type."
          currentSelection={selectedForecast || ''}
          tooltipType="forecastType"
          getTooltipMessage={getTooltipMessage}
        />
        <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
          Select packages:
        </div>
        <PackageSelector key={packageSelectorKey} />
        <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg m-2">
          Select model type:
        </div>
        <Dropdown
          iconPlaceholder={google_question_mark}
          iconImage={modelToIcon[selectedModel] || google_question_mark}
          options={modelTypeOptions}
          onSelect={handleModelSelect}
          placeholder="Select a model type."
          currentSelection={selectedModel || ''}
          tooltipType="modelType"
          getTooltipMessage={getTooltipMessage}
        />
      </div>
    </div>
  );
};

export default ModelCreatorWidget;
