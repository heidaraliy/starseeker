import { useState, FC, ChangeEvent } from 'react';

interface ParameterInputProps {
  parameter: string;
  useOptimizer: boolean;
  onParameterChange: (param: string, value: number | string) => void;
}

const ParameterInput: FC<ParameterInputProps> = ({
  parameter,
  useOptimizer,
  onParameterChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinValue(value);
    onParameterChange(parameter + '_min', Number(value)); // Append '_min' to differentiate from max
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxValue(value);
    onParameterChange(parameter + '_max', Number(value)); // Append '_max' to differentiate from min
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onParameterChange(parameter, value);
  };
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
            value={minValue}
            onChange={handleMinChange}
          ></input>
          <input
            type="number"
            placeholder="max"
            className="border-2 border-black font-heebo font-light text-sm pl-1.5 w-full"
            value={maxValue}
            onChange={handleMaxChange}
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
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>
    );
  }
};

export default ParameterInput;
