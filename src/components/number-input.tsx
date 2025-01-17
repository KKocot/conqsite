import React from "react";
import { Input } from "./ui/input";

interface NumberInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  onBlur?: () => void;
}

export default function NumberInput({
  value,
  onChange,
  className,
  disabled,
  id,
  onBlur,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);

    if (inputValue === "" || !isNaN(numericValue)) {
      const newValue = inputValue === "" ? "" : numericValue;
      onChange(newValue);
    }
  };
  return (
    <Input
      onBlur={onBlur}
      id={id}
      disabled={disabled}
      value={value === "" ? "" : value.toString()}
      onChange={handleChange}
      className={className}
    />
  );
}
