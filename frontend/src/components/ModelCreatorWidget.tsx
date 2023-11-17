import React, { useState } from 'react';
import python_logo from '../assets/python_logo.svg';
import r_logo from '../assets/r_logo.svg';
import google_refresh from '../assets/google_refresh.svg';
import google_hourglass from '../assets/google_hourglass.svg';
import google_shutter from '../assets/google_shutter.svg';
import google_line_chart from '../assets/google_line_chart.svg';
import google_question_mark from '../assets/google_question_mark.svg';
import google_error from '../assets/google_error.svg';
import google_var from '../assets/google_var.svg';
import google_neural from '../assets/google_neural.svg';
import google_snowflake from '../assets/google_question_mark.svg';
import google_line_curve from '../assets/google_line_curve.svg';
import google_brain from '../assets/google_brain.svg';
import google_stacked_line_chart from '../assets/google_stacked_line_chart.svg';
import google_eye from '../assets/google_eye.svg';
import google_flowchart from '../assets/google_flowchart.svg';
import google_tree from '../assets/google_tree.svg';
import google_plus from '../assets/google_plus.svg';
import google_paw from '../assets/google_paw.svg';
import google_weight from '../assets/google_weight.svg';
import google_rocket from '../assets/google_rocket.svg';
import Dropdown from './Dropdown';
import PackageSelector from './PackageSelector';
import Tooltip from './Tooltip';

const ModelCreatorWidget: React.FC = () => {
  //set key for packageSelectorKey so we can refresh it to default when a user clicks the refresh button.
  const [packageSelectorKey, setPackageSelectorKey] = useState(0);

  //programming language selection consts, states, and handling.
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const programmingLanguageOptions = ['Python', 'R'];

  const languageToIcon = {
    Python: python_logo,
    R: r_logo,
  };

  //data type selection consts, states, and handling.
  const [selectedForecast, setSelectedForecast] = useState<string | null>('');

  const handleForecastSelect = (forecast: string) => {
    setSelectedForecast(forecast);
  };

  const forecastTypeOptions = [
    'Time Series',
    'Cross-Sectional Data',
    'Logitudinal Data',
  ];

  const forecastToIcon = {
    'Time Series': google_hourglass,
    'Cross-Sectional Data': google_shutter,
    'Logitudinal Data': google_line_chart,
  };

  //model type selection consts, states, and handling.
  const [selectedModel, setSelectedModel] = useState<string | null>('');

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const modelTypeOptions = [
    'Linear Regression',
    'ARIMA',
    'SARIMA',
    'xgboost',
    'LightGBM',
    'Catboost',
    'AdaBoost',
    'Random Forest',
    'Decision Tree',
    'Prophet',
    'LSTM',
    'Gaussian Processes',
    'Holt-Winters Exponential Smoothing',
    'Vector Autoregression',
    'Support Vector Machine',
    'Neural Network Autoregression',
    'ETS (Error, Trend, Seasonal)',
  ];

  const modelToIcon = {
    'Linear Regression': google_stacked_line_chart,
    ARIMA: google_stacked_line_chart,
    SARIMA: google_stacked_line_chart,
    xgboost: google_rocket,
    LightGBM: google_weight,
    Catboost: google_paw,
    AdaBoost: google_plus,
    'Random Forest': google_tree,
    'Decision Tree': google_flowchart,
    Prophet: google_eye,
    LSTM: google_brain,
    'Gaussian Processes': google_line_curve,
    'Holt-Winters Exponential Smoothing': google_snowflake,
    'Vector Autoregression': google_var,
    'Support Vector Machine': google_var,
    'Neural Network Autoregression': google_neural,
    'ETS (Error, Trend, Seasonal)': google_error,
  };

  //handling the user clicking refresh -- this resets all fields to default.
  const handleModelCreatorRefresh = () => {
    setSelectedLanguage('');
    setSelectedForecast('');
    setSelectedModel('');
    setPackageSelectorKey((prevKey) => prevKey + 1);
  };

  const getTooltipMessage = (option: string) => {
    if (option === 'Python') {
      return (
        <>
          <div className="flex flex-col">
            <img src={python_logo} alt="Python Logo" className="h-8 m-1" />
            <span>
              Python is versatile for forecasting with libraries like NumPy and
              pandas, ideal for machine learning models and complex data
              manipulation. Suited for users with a broad range of tasks.
            </span>
          </div>
        </>
      );
    } else if (option === 'R') {
      return (
        <>
          <div className="flex flex-col">
            <img src={r_logo} alt="Python Logo" className="h-8 m-1" />
            <span>
              R excels in statistical analysis and visualizing data, providing
              robust packages like forecast and tidyverse. It's preferred for
              specialized statistical computations and reporting.
            </span>
          </div>
        </>
      );
    }
    return '';
  };
  return (
    <div className="bg-gray-50 md:w-[42rem] xl:w-[36rem] 2xl:w-[44rem] drop-shadow-2xl">
      <div className="border-2 border-black h-[44rem]">
        <div className="drop-shadow-xl tracking-tighter flex flex-row font-JetBrains border-b-2 border-black bg-stone-300 h-[2rem] justify-between items-center">
          <div>
            <span className="material-symbols-outlined m-2">terminal</span>
            <span className="relative drop-shadow-md text-[1.1rem] font-bold -top-1.5 -left-0.5">
              model_creator.exe
            </span>
          </div>
          <Tooltip message="Use this button to reset the Model Creator.">
            <img
              src={google_refresh}
              className=" m-2 drop-shadow-md cursor-pointer hover:-rotate-12 active:-rotate-45 transition duration-200"
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
          getToolTipMessage={getTooltipMessage}
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
          getToolTipMessage={getTooltipMessage}
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
          getToolTipMessage={getTooltipMessage}
        />
      </div>
    </div>
  );
};

export default ModelCreatorWidget;
