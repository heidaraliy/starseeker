import ParameterInput from '../inputs/ParameterInput';
import { xgBoostParameters } from '../../consts/modelParameterTypes';

type ModelParameterFunction = (useOptimizer: boolean) => JSX.Element;

interface ModelParameters {
  [key: string]: ModelParameterFunction;
}

export const modelParameters: ModelParameters = {
  XGBoost: (useOptimizer: boolean) => (
    <div>
      {xgBoostParameters.map((parameter) => (
        <ParameterInput
          key={parameter}
          parameter={parameter}
          useOptimizer={useOptimizer}
        />
      ))}
    </div>
  ),
};
