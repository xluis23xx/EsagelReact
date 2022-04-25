import React from "react";

type TextAreaProps = {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string | boolean;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: string;
  showError?: boolean;
  maxLength?: number;
  rows?: number;
  cols?: number;
};

export const TextAreaForm: React.FC<TextAreaProps> = ({
  placeholder = "",
  onChange,
  disabled,
  error,
  value,
  name = "",
  required = false,
  className = "form-control",
  showError = true,
  maxLength = 50,
  rows = 1,
  cols = 1,
}) => {
  return (
    <>
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`${className} ${error ? "border border-danger" : ""}`}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onChange}
      ></textarea>
      {showError ? (
        <p className="w-100 pb-0 mb-0 text-danger" style={{ fontSize: 15 }}>
          {error}
        </p>
      ) : null}
    </>
  );
};
