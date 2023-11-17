import ModelCreatorWidget from '../components/ModelCreatorWidget';
import ModelCreatorWidgetExtension from '../components/ModelCreatorWidgetExtension';

const GazeModelCreatorPage = () => {
  return (
    <div className="bg-indigo-50 min-h-screen p-12">
      <div className="flex flex-col w-full animate-fade-in-left">
        <div className="flex-1 mt-12 lg:p-8">
          <h1 className="font-heebo font-bold text-4xl tracking-tighter drop-shadow-lg text-indigo-950">
            Model Creator
          </h1>
          <div className="flex flex-col justify-center p-4">
            <p className=" font-heebo font-light md:text-xl text-xl bg-gray-800 text-transparent bg-clip-text tracking-tighter">
              Your data at a glance. Set and adjust your most vital insights.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex md:flex-col xl:flex-row xl:-space-x-0.5">
            <div className="z-10">
              <ModelCreatorWidget />
            </div>
            <div className="xl:my-auto md:mx-auto md:-mt-0.5 -z-5">
              <ModelCreatorWidgetExtension />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GazeModelCreatorPage;
