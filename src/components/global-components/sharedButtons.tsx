import * as React from "react";

export const SharedButtons = () => {
  return (
    <div className="mx-auto mx-ms-0 me-ms-auto col-12 col-md-6 text-center text-md-start">
      <button type="button" className="btn btn-default btn-secondary">
        COPIA
      </button>

      <button type="button" className="btn btn-default btn-secondary">
        EXCEL
      </button>

      <button type="button" className="btn btn-default btn-secondary">
        CSV
      </button>

      <button type="button" className="btn btn-default btn-secondary">
        PDF
      </button>
    </div>
  );
};
