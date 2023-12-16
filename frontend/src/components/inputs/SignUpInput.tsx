import { useState, FC, ChangeEvent } from 'react';

interface SignUpInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const SignUpInput: FC<SignUpInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) => {
  const [, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(event);
  };

  return (
    <div className="flex flex-col px-12 mt-6">
      <label className="font-heebo font-light text-sm text-left py-0.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        className="border-2 border-neutral-400 rounded-sm font-heebo font-light text-sm pl-1.5 w-full"
        onChange={handleInputChange}
      />
      {error && (
        <span className="text-red-700 text-xs text-left font-heebo font-light pt-1">
          {error}
        </span>
      )}{' '}
    </div>
  );
};

export default SignUpInput;
