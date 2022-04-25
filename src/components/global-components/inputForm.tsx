import React from "react";

type InputProps = {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | boolean;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
  showError?: boolean;
  maxLength?: number;
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
  className = "form-control",
  showError = true,
  maxLength = 50,
}) => {
  return (
    <>
      <input
        id={name}
        type={type}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${className} ${error ? "border border-danger" : ""}`}
        value={value}
        required={required}
        disabled={disabled}
        onBlur={onChange}
        onChange={onChange}
      />
      {showError ? (
        <p className="w-100 pb-0 mb-0 text-danger" style={{ fontSize: 15 }}>
          {error}
        </p>
      ) : null}
    </>
  );
};
