import UserDashboardCardContainer from '../../components/UserDashboardCardContainer';
import { useAuth0 } from '@auth0/auth0-react';

const UserDashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div className="bg-indigo-300 min-h-screen p-10 mt-4 pl-14 lg:pl-6 lg:p-4 lg:mt-0">
        <div className="flex flex-col w-full animate-fade-in-left">
          <div className="flex-1 mt-12 lg:p-8">
            <h1 className="font-heebo font-bold text-3xl xl:text-4xl tracking-tighter drop-shadow-lg text-indigo-950">
              Create
            </h1>
            <div className="flex flex-col justify-center p-4">
              <p className="font-heebo font-light md:text-xl text-xl bg-neutral-800 text-transparent bg-clip-text tracking-tighter">
                Create new forecasts, visualizations, and reports at the click
                of a button.
              </p>
            </div>
            <div className="flex-1 xl:px-12">
              <UserDashboardCardContainer />
            </div>
            <h1 className="mt-8 font-heebo font-bold text-3xl xl:text-4xl tracking-tighter drop-shadow-lg text-indigo-950">
              Snapshots
            </h1>
            <div className="flex flex-col justify-center p-4">
              <p className="font-heebo font-light mb-4 md:text-xl text-xl bg-neutral-800 text-transparent bg-clip-text tracking-tighter">
                Your data at a glance. Set and adjust your most vital insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserDashboardPage;
