import { FC } from 'react';

interface ParameterInputProps {
  parameter: string;
  useOptimizer: boolean;
}

const ParameterInput: FC<ParameterInputProps> = ({
  parameter,
  useOptimizer,
}) => {
  if (useOptimizer) {
    return (
      <div className="flex flex-col px-2 py-1">
        <label className="font-heebo font-light text-sm">
          Define a range for <span className="font-bold">{parameter}</span>:
        </label>
        <div className="flex justify-between space-x-2">
          <input
            type="number"
            placeholder="min"
            className="border-2 border-black font-heebo font-light text-sm pl-1.5 w-full"
          ></input>
          <input
            type="number"
            placeholder="max"
            className="border-2 border-black font-heebo font-light text-sm pl-1.5 w-full"
          ></input>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col px-2 py-1">
        <label className="font-heebo font-light text-sm">
          Enter a value for <span className="font-bold">{parameter}</span>:
        </label>
        <input
          type="number"
          placeholder="value"
          className="border-2 border-black font-heebo font-light text-sm pl-1.5 w-full"
        ></input>
      </div>
    );
  }
};

export default ParameterInput;
