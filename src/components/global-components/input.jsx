/* eslint-disable react/prop-types */

import React from "react";

export const Input = (props) => {
  const { onChange, error, value } = props;
  return (
    <>
      <input
        className={`form-control ${error ? "border border-danger" : ""}`}
        value={value}
        onBlur={onChange}
        {...props}
      />
      <p className="w-100 pb-0 mb-0 text-danger" style={{ fontSize: 15 }}>
        {error}
      </p>
    </>
  );
};
