import ParameterInput from '../inputs/ParameterInput';
import { xgBoostParameters } from '../../consts/modelParameterTypes';

type ModelParameterFunction = (
  useOptimizer: boolean,
  onParameterChange: (param: string, value: number | string) => void
) => JSX.Element;

interface ModelParameters {
  [key: string]: ModelParameterFunction;
}

export const modelParameters: ModelParameters = {
  XGBoost: (useOptimizer: boolean, onParameterChange) => (
    <div>
      {xgBoostParameters.map((parameter) => (
        <ParameterInput
          key={parameter}
          parameter={parameter}
          useOptimizer={useOptimizer}
          onParameterChange={onParameterChange}
        />
      ))}
    </div>
  ),
};
