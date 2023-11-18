import google_hourglass from '../assets/google_hourglass.svg';
import google_shutter from '../assets/google_shutter.svg';
import google_line_chart from '../assets/google_line_chart.svg';

export const forecastTypeOptions = [
  'Time Series',
  'Cross-Sectional Data',
  'Logitudinal Data',
];

export const forecastToIcon = {
  'Time Series': google_hourglass,
  'Cross-Sectional Data': google_shutter,
  'Logitudinal Data': google_line_chart,
};
