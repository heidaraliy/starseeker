import ParticleSystem from '../../components/Particle';

const GazeMobilePage = () => {
  return (
    <div>
      <div className="matrix animate-fade-in-flat">
        <ParticleSystem />
      </div>
      <div className="min-h-screen p-10 mt-4 pl-14 lg:pl-6 lg:p-4 lg:mt-0">
        <div className="pt-12 min-h-screen">
          <div className="p-12 space-y-4 animate-fade-in-left">
            <h1 className="font-heebo font-bold text-3xl xl:text-4xl tracking-tighter drop-shadow-lg text-indigo-50">
              Gaze isn't available on smartphones.
            </h1>
            <h2 className="font-heebo font-light text-xl tracking-tighter drop-shadow-lg text-indigo-50">
              Please open Gaze in a compatible device!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GazeMobilePage;
