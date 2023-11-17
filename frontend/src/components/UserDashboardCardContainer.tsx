import Card from '../components/Card';
import modulo_forecasting from '../assets/modulo_forecasting.png';
import modulo_visualizations from '../assets/modulo_visualizations.png';
import modulo_analytics from '../assets/modulo_analytics.png';

const UserDashboardCardContainer = () => {
  const selectForecast = (type: string) => {
    console.log(`Selected forecast: ${type}`);
    // connect backend later
  };
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <Card
          title="Create a forecast."
          description="Find a forecasting method for every scenario. Plug and play with your data."
          onClick={() => selectForecast('A')}
          img={modulo_forecasting}
        />
        <Card
          title="Create a visualization."
          description="Model, visualize and export your data — complete with automated reporting."
          onClick={() => selectForecast('B')}
          img={modulo_visualizations}
        />
        <Card
          title="Generate an analytics report."
          description="Access powerful developer tools to shape and transform your data."
          onClick={() => selectForecast('C')}
          img={modulo_analytics}
        />
      </div>
    </div>
  );
};

export default UserDashboardCardContainer;
