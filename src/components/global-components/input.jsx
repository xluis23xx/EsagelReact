/* eslint-disable react/prop-types */

import React from "react";

export const Input = (props) => {
  const { onChange, error } = props;
  return (
    <>
      <input
        className={`form-control ${error ? "border border-danger" : ""}`}
        onBlur={onChange}
        {...props}
      />
      <p className="w-100 pb-0 mb-0 text-danger" style={{ fontSize: 15 }}>
        {error}
      </p>
    </>
  );
};
