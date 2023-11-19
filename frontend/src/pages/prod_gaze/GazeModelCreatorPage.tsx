import ModelCreatorWidget from '../../components/ModelCreatorWidget';
import ParticleSystem from '../../components/Particle';

const GazeModelCreatorPage = () => {
  return (
    <div className="min-h-screen p-10 mt-4 pl-14 lg:pl-6 lg:p-4 lg:mt-0">
      <div className="matrix animate-fade-in-flat">
        <ParticleSystem />
      </div>
      <div className="flex flex-col w-full animate-fade-in-left">
        <div className="flex-1 mt-12 lg:p-8">
          <h1 className="font-heebo font-bold text-2xl xl:text-3xl tracking-tighter drop-shadow-lg text-indigo-50">
            Model Creator
          </h1>
          <div className="flex flex-col justify-center p-4">
            <p className=" font-heebo font-light md:text-xl text-lg bg-neutral-100 text-transparent bg-clip-text tracking-tighter">
              <strong>Gaze's </strong>
              <i className="px-[0.05rem]">Model Creator </i>makes creating new
              forecasting methods easy and intuitive. Hover over each option to
              learn more about it.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:-mt-5">
          <div className="flex md:flex-col xl:flex-row xl:-space-x-0.5">
            <div className="z-10">
              <ModelCreatorWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GazeModelCreatorPage;
