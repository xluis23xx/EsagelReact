import * as React from "react";

export const SharedButtons = () => {
  return (
    <div className="mx-auto mx-ms-0 me-ms-auto col-12 col-md-6 text-center text-md-start text-light d-inline-block">
      <button
        type="button"
        className="btn btn-dark mx-2 my-1"
        style={{ minWidth: "70px" }}
      >
        COPIA
      </button>
      <button
        type="button"
        className="btn btn-dark mx-2 my-1"
        style={{ minWidth: "70px" }}
      >
        EXCEL
      </button>
      <button
        type="button"
        className="btn btn-dark mx-2 my-1"
        style={{ minWidth: "70px" }}
      >
        CSV
      </button>
      <button
        type="button"
        className="btn btn-dark mx-2 my-1"
        style={{ minWidth: "70px" }}
      >
        PDF
      </button>
    </div>
  );
};
