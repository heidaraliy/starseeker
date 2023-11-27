import google_error from '../assets/google_error.svg';
import google_var from '../assets/google_var.svg';
import google_neural from '../assets/google_neural.svg';
import google_snowflake from '../assets/google_question_mark.svg';
import google_line_curve from '../assets/google_line_curve.svg';
import google_brain from '../assets/google_brain.svg';
import google_stacked_line_chart from '../assets/google_stacked_line_chart.svg';
import google_eye from '../assets/google_eye.svg';
import google_flowchart from '../assets/google_flowchart.svg';
import google_tree from '../assets/google_tree.svg';
import google_plus from '../assets/google_plus.svg';
import google_paw from '../assets/google_paw.svg';
import google_weight from '../assets/google_weight.svg';
import google_rocket from '../assets/google_rocket.svg';

//for when you implement R scripts -- update R packages here, no need to split them!
export const packageToModelsMap = {
  statsmodels: [
    'ARIMA',
    'SARIMA',
    'Vector Autoregression',
    'ETS (Error, Trend, Seasonal)',
    'Linear Regression',
  ],
  'scikit-learn': [
    'Linear Regression',
    'AdaBoost',
    'Random Forest',
    'Decision Tree',
    'Support Vector Machine',
  ],
  'TensorFlow (Python)': ['Neural Network Autoregression', 'LSTM'],
  'Prophet (Python)': ['Prophet'],
  PyCaret: [
    'Linear Regression',
    'Random Forest',
    'XGBoost',
    'LightGBM',
    'Catboost',
    'AdaBoost',
    'Decision Tree',
    'Support Vector Machine',
    'Gaussian Processes',
  ],
  XGBoost: ['XGBoost'],
  LightGBM: ['LightGBM'],
  'Catboost (Python)': ['Catboost'],
  Hyperopt: [],
  Optuna: [],
  Spearmint: [],
  'Ray Tune': [],
};

export const modelTypeOptions = [
  'Linear Regression',
  'ARIMA',
  'SARIMA',
  'XGBoost',
  'LightGBM',
  'Catboost',
  'AdaBoost',
  'Random Forest',
  'Decision Tree',
  'Prophet',
  'LSTM',
  'Gaussian Processes',
  'Holt-Winters Exponential Smoothing',
  'Vector Autoregression',
  'Support Vector Machine',
  'Neural Network Autoregression',
  'ETS (Error, Trend, Seasonal)',
];

export const modelToIcon = {
  'Linear Regression': google_stacked_line_chart,
  ARIMA: google_stacked_line_chart,
  SARIMA: google_stacked_line_chart,
  XGBoost: google_rocket,
  LightGBM: google_weight,
  Catboost: google_paw,
  AdaBoost: google_plus,
  'Random Forest': google_tree,
  'Decision Tree': google_flowchart,
  Prophet: google_eye,
  LSTM: google_brain,
  'Gaussian Processes': google_line_curve,
  'Holt-Winters Exponential Smoothing': google_snowflake,
  'Vector Autoregression': google_var,
  'Support Vector Machine': google_var,
  'Neural Network Autoregression': google_neural,
  'ETS (Error, Trend, Seasonal)': google_error,
};
