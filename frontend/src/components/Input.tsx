import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  name = '',
  className = ''
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded ${className}`}
    />
  );
};

export default Input; 