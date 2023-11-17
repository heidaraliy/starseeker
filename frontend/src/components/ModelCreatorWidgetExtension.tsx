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

const ModelCreatorWidgetExtension: React.FC = () => {
  const [packageSelectorKey, setPackageSelectorKey] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const programmingLanguageOptions = ['Python', 'R'];

  const languageToIcon = {
    Python: python_logo,
    R: r_logo,
  };

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

  const handleModelCreatorRefresh = () => {
    setSelectedLanguage('');
    setSelectedForecast('');
    setSelectedModel('');
    setPackageSelectorKey((prevKey) => prevKey + 1);
  };

  const handleProcessModel = async () => {
    try {
      // Prepare the data you want to send to the backend
      const dataToSend = {
        selectedLanguage,
        selectedForecast,
        // Add any other relevant model parameters here
      };

      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint of your backend API
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', dataToSend);

      // Handle the response from the backend as needed
      console.log('Response from backend:', response.data);
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error sending data to backend:', error);
    }
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
    <div className="bg-gray-50 md:w-[38rem] 2xl:w-[42rem] drop-shadow-xl">
      <div className="border-2 border-black md:h-[28rem] xl:h-[42rem]">
        <div className="flex justify-center py-6">
          <button
            className="bg-stone-200 hover:bg-stone-300 hover:-translate-y-0.5 active:translate-y-0 text-slate-900 tracking-tighter font-heebo px-4 border-2 border-black shadow-lg duration-200 transition ease-in-out"
            onClick={handleProcessModel}
          >
            Process Model
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCreatorWidgetExtension;
