import React from "react";

type InputProps = {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error: string | boolean;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
};

export const InputForm: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  autoComplete = "",
  onChange,
  disabled,
  error,
  value,
  name = "",
  required = false,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`form-control ${error ? "border border-danger" : ""}`}
        value={value}
        required={required}
        disabled={disabled}
        onBlur={onChange}
        onChange={onChange}
      />
      <p className="w-100 pb-0 mb-0 text-danger" style={{ fontSize: 15 }}>
        {error}
      </p>
    </>
  );
};
