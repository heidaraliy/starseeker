const GazeMobilePage = () => {
  return (
    <div className="bg-indigo-50 pt-12 min-h-screen">
      <div className="p-12 space-y-4 animate-fade-in-left">
        <h1 className="font-heebo font-bold text-3xl tracking-tighter drop-shadow-lg text-indigo-950">
          Gaze isn't available on smartphones.
        </h1>
        <h2 className="font-heebo font-light text-xl tracking-tighter drop-shadow-lg text-indigo-950">
          Please open Gaze in a compatible device!
        </h2>
      </div>
    </div>
  );
};

export default GazeMobilePage;
