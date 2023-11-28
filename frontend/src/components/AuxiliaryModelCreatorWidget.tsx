import { FC } from 'react';
import { modelParameters } from '../consts/modelParameters';
import axios from 'axios';

interface AuxiliaryModelCreatorProps {
  selectedModel: string | null;
  selectedLanguage: string | null;
  selectedForecast: string | null;
  selectedPackages: string[] | null;
}

const AuxiliaryModelCreatorWidget: FC<AuxiliaryModelCreatorProps> = ({
  selectedModel,
  selectedLanguage,
  selectedForecast,
  selectedPackages,
}) => {
  //overlay blur for auxiliary model creator section
  const showAuxModelCreator =
    !selectedForecast || !selectedLanguage || !selectedModel;

  const renderInputs = () => {
    if (selectedModel && modelParameters[selectedModel]) {
      return modelParameters[selectedModel]();
    }
    return <div>Select a model to see configurable options.</div>;
  };

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
          <div className="border-2 border-black md:h-[28rem] xl:h-[41rem]">
            <div className="flex-col justify-center py-6">
              <div className="flex justify-center font-heebo font-bold">
                Next, specify your {selectedModel} parameters!
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
