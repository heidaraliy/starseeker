import { FC } from 'react';
import { modelParameters } from './models/ModelParameters';
import axios from 'axios';

interface AuxiliaryModelCreatorProps {
  selectedModel: string;
  selectedLanguage: string;
  selectedForecast: string;
  selectedPackages: string[];
}

const AuxiliaryModelCreatorWidget: FC<AuxiliaryModelCreatorProps> = ({
  selectedModel,
  selectedLanguage,
  selectedForecast,
  selectedPackages = [],
}) => {
  //track whether or not an optimizer is being used
  const useOptimizer = selectedPackages?.includes('Optuna') ?? false;

  //render appropriate model params based on selected model
  const renderInputs = () => {
    if (selectedModel && modelParameters[selectedModel]) {
      return modelParameters[selectedModel](useOptimizer);
    }
  };

  //overlay blur for auxiliary model creator section
  const showAuxModelCreator =
    !selectedForecast || !selectedLanguage || !selectedModel;

  //prep data to send to backend
  const handleProcessModel = async () => {
    try {
      const dataToSend = {
        forecastType: selectedForecast,
        language: selectedLanguage,
        packages: selectedPackages,
        model: selectedModel,
      };

      //endpoint
      const response = await axios.post('/api/model/create', dataToSend);

      //success
      console.log('Model created! Response data:', response.data);
    } catch (error) {
      //failure
      console.error('Model creation failure.', error);
    } finally {
      //empty
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
              <div className="mx-auto px-6">{renderInputs()}</div>
              <div className="flex justify-center">
                <button
                  className="bg-neutral-200 hover:bg-neutral-300 hover:-translate-y-0.5 active:translate-y-0 text-slate-900 tracking-tighter font-heebo px-4 mt-4 border-2 border-black shadow-lg duration-200 transition ease-in-out"
                  onClick={handleProcessModel}
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
