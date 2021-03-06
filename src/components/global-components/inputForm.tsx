import React from "react";

type InputProps = {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | boolean | null;
  value: string | null;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  readonly?: boolean;
  className?: string;
  showError?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: string;
};

export const InputForm: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  autoComplete = "",
  onChange,
  disabled,
  error = "",
  value = "",
  name = "",
  required = false,
  className = "form-control",
  showError = true,
  minLength = 2,
  maxLength = 50,
  min = undefined,
  max = undefined,
  step = undefined,
  readonly = undefined,
}) => {
  return (
    <>
      <input
        id={name}
        type={type}
        min={min}
        max={max}
        name={name}
        step={step}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${className} ${error ? "border border-danger" : ""}`}
        value={value || ""}
        readOnly={readonly}
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
