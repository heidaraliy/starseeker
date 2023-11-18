import python_logo from '../assets/python_logo.svg';
import r_logo from '../assets/r_logo.svg';

export const languageTooltips = {
  Python: (
    <div className="flex flex-col">
      <img src={python_logo} alt="Python Logo" className="h-8 m-1" />
      <span>
        Python is versatile for forecasting with libraries like NumPy and
        pandas, ideal for machine learning models and complex data manipulation.
        Suited for users with a broad range of tasks.
      </span>
    </div>
  ),
  R: (
    <div className="flex flex-col">
      <img src={r_logo} alt="Python Logo" className="h-8 m-1" />
      <span>
        R excels in statistical analysis and visualizing data, providing robust
        packages like forecast and tidyverse. It's preferred for specialized
        statistical computations and reporting.
      </span>
    </div>
  ),
};
