import { FC, useState } from 'react';
import { modelParameters as modelParametersConfig } from './models/ModelParameters';
import { formatToSnakeCase } from '../utils/formatToSnakeCase';
import axios from 'axios';

interface AuxiliaryModelCreatorProps {
  selectedModel: string;
  selectedLanguage: string;
  selectedForecast: string;
  selectedPackages: string[];
}

interface DataToSend {
  forecast_type_formatted: string;
  forecast_type_raw: string;
  language_formatted: string;
  language_raw: string;
  packages_formatted: string[];
  packages_raw: string[];
  model_type_formatted: string;
  model_type_raw: string;
  model_name_formatted: string;
  model_name_raw: string;
  model_parameters_formatted: { [key: string]: string | number };
  model_parameters_raw: { [key: string]: string | number };
}

const AuxiliaryModelCreatorWidget: FC<AuxiliaryModelCreatorProps> = ({
  selectedModel,
  selectedLanguage,
  selectedForecast,
  selectedPackages = [],
}) => {
  //track whether or not an optimizer is being used
  const useOptimizer =
    selectedPackages?.includes('Optuna' || 'Spearmint') ?? false;

  const [modelName, setModelName] = useState('');

  const handleModelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelName(event.target.value);
  };

  const [modelParameters, setModelParameters] = useState<{
    [key: string]: number | string;
  }>({});

  const handleParameterChange = (param: string, value: number | string) => {
    const numericValue = typeof value === 'string' ? Number(value) || 0 : value;
    setModelParameters((prev) => ({ ...prev, [param]: numericValue }));
  };

  //render appropriate model params based on selected model
  const renderInputs = () => {
    if (selectedModel && modelParametersConfig[selectedModel]) {
      return modelParametersConfig[selectedModel](
        useOptimizer,
        handleParameterChange
      );
    }
  };

  //overlay blur for auxiliary model creator section
  const showAuxModelCreator =
    !selectedForecast || !selectedLanguage || !selectedModel;

  const openAdvancedParameterSettingsModal = () => {};

  //pre-process to snake_case
  const processDataToSend = () => {
    // process params
    const processedParameters = Object.keys(modelParameters).reduce(
      (acc, key) => {
        const formattedKey = formatToSnakeCase(key);
        acc[formattedKey] = modelParameters[key];
        return acc;
      },
      {}
    );

    // process other selections
    const dataToSend = {
      forecast_type_formatted: formatToSnakeCase(selectedForecast),
      forecast_type_raw: selectedForecast,
      language_formatted: formatToSnakeCase(selectedLanguage),
      language_raw: selectedLanguage,
      packages_formatted: selectedPackages.map((pkg) => formatToSnakeCase(pkg)),
      packages_raw: selectedPackages,
      model_type_formatted: formatToSnakeCase(selectedModel),
      model_type_raw: selectedModel,
      model_name_formatted: formatToSnakeCase(modelName),
      model_name_raw: modelName,
      model_parameters_formatted: processedParameters,
      model_parameters_raw: modelParameters,
    };

    handleProcessModel(dataToSend);
  };

  // handle actual data processing
  const handleProcessModel = async (dataToSend: DataToSend) => {
    try {
      const response = await axios.post('/api/model/create', dataToSend);
      console.log('Model data sent. Response:', response.data);
    } catch (error) {
      console.error('Model creation failure.', error);
      console.log(dataToSend);
    }
  };
  return (
    <div className="xl:my-auto md:mx-auto md:-mt-0.5 -z-1">
      <div className={`package-selector ${showAuxModelCreator ? 'blur' : ''}`}>
        <div className="bg-neutral-50 md:w-[38rem] xl:w-[32rem] 2xl:w-[40rem] drop-shadow-xl">
          <div className="border-2 border-black md:h-[30rem] xl:h-[43rem]">
            <div
              className={`flex-col justify-center p-2 py-4 ${
                showAuxModelCreator ? 'hidden' : ''
              }`}
            >
              <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg mx-2">
                <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
                  info
                </span>
                Specify your {selectedModel} parameters:
              </div>
              <div className="mx-auto px-6 mt-2">{renderInputs()}</div>
              <div className="flex justify-center">
                <button
                  onClick={openAdvancedParameterSettingsModal}
                  className="my-4 font-heebo font-light text-neutral-50 border-indigo-950 bg-indigo-800 border-2 p-1 text-sm hover:-translate-y-0.5 active:translate-y-0 duration-200 transition"
                >
                  Advanced Parameter Settings
                </button>
              </div>
              <div className="flex flex-col px-2">
                <div className="tracking-tighter font-heebo text-[1.05rem] drop-shadow-lg">
                  <span className="material-symbols-outlined text-lg align-bottom m-0.5 cursor-help">
                    info
                  </span>
                  Enter a name for your model:
                  <div className="mx-6 mt-2">
                    <label className="font-heebo font-light text-sm"></label>
                    <input
                      type="text"
                      placeholder="name"
                      className="border-2 border-black font-heebo font-light text-sm pl-1.5 w-full"
                      value={modelName}
                      onChange={handleModelNameChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-neutral-200 hover:bg-neutral-300 hover:-translate-y-0.5 active:translate-y-0 text-slate-900 tracking-tighter font-heebo px-4 mt-4 border-2 border-black shadow-lg duration-200 transition ease-in-out"
                  onClick={processDataToSend}
                >
                  Process Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliaryModelCreatorWidget;
