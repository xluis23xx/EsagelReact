import { Link } from "react-router-dom";
import * as React from "react";
import useForm from "../../hooks/useForm";
import { InputForm } from "./inputForm";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilSearch } from "@coreui/icons";

export const RedirectionButton = ({
  redirection = "",
  classContainer = "col-12 col-sm-3 col-md-2 col-lg-2",
  classButton = "btn   btn-success w-100 h-auto text-white",
  textButton = "Nuevo",
}) => (
  <div className={classContainer}>
    <Link className={classButton} to={redirection}>
      {textButton}
    </Link>
  </div>
);

export const EditItemButton = ({
  className = "btn btn-warning",
  code = "",
  path = "",
  icon = cilPencil,
  subsection = "editar",
}) => {
  return (
    <Link
      type="button"
      className={className}
      style={{ height: 40, width: 40 }}
      to={`/${path}/${subsection}/${code}`}
    >
      <CIcon icon={icon} />
    </Link>
  );
};

export const SearchButton = ({
  validators,
  handleSearch,
  textButton = "Buscar",
  className = "align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex",
}) => {
  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      ...validators,
    },
  };

  const {
    values: { search },
    errors: { search: searchError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <form className={className} onSubmit={handleOnSubmit}>
      <div className="col-12 col-sm-6 my-1 ms-sm-auto">
        <InputForm
          type="search"
          name="search"
          className="form-control"
          placeholder="Buscar"
          aria-label="Buscar"
          value={search || ""}
          error={searchError || false}
          showError={false}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="btn btn-dark text-white col-12 col-sm-3 my-1 ms-sm-3"
        type="submit"
        disabled={disable}
      >
        {textButton}
      </button>
    </form>
  );
};

export const IntervalButton = ({
  validators,
  handleSearch,
  required = undefined,
  className = "align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex",
  textButton = "Buscar",
}) => {
  const stateSchema = {
    startDate: { value: "", error: "" },
    endDate: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    startDate: {
      ...validators,
    },
    endDate: {
      ...validators,
    },
  };

  const {
    values: { startDate, endDate },
    errors: { startDate: startDateError, endDate: endDateError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <form className={className} onSubmit={handleOnSubmit}>
      <div className="form-group col-12 col-sm-5">
        <label className="form-label" htmlFor="startDate">
          Fecha Inicial
        </label>
        <InputForm
          name="startDate"
          type="date"
          required={required}
          className="form-control"
          aria-label="Intervalo Inicial"
          value={startDate || ""}
          error={startDateError || false}
          showError={false}
          onChange={handleOnChange}
        />
      </div>
      <div className="form-group col-12 col-sm-5 ms-sm-1">
        <label className="form-label" htmlFor="endDate">
          Fecha Final
        </label>
        <InputForm
          name="endDate"
          type="date"
          required={required}
          className="form-control"
          aria-label="Intervalo Final"
          value={endDate || ""}
          error={endDateError || false}
          showError={false}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="btn btn-dark text-white col-12 col-sm-2 ms-sm-1 mt-1"
        type="submit"
        disabled={disable}
      >
        <CIcon className="d-none d-sm-inline-block" icon={cilSearch} />
        <p className="d-inline-block text-white d-sm-none m-0">{textButton}</p>
      </button>
    </form>
  );
};

export const SubmitButton = ({
  disabled = undefined,
  children = null,
  className = "btn btn-info w-100 text-white",
  style = undefined,
}: {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: any;
}) => {
  return (
    <button
      type="submit"
      className={className}
      disabled={disabled}
      style={style ? { ...style } : undefined}
    >
      {children}
    </button>
  );
};
