import { Link } from "react-router-dom";
import * as React from "react";
import useForm from "../../hooks/useForm";
import { InputForm } from "./inputForm";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilSearch } from "@coreui/icons";
import { PaginateResponse } from "../../hooks/types";
import { CTooltip } from "@coreui/react";

export const RedirectionButton = ({
  redirection = "",
  classContainer = "col-12 col-sm-3 col-md-3 col-lg-2",
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
  title = "",
  icon = cilPencil,
  subsection = "editar",
}) => {
  return (
    <>
      {title ? (
        <CTooltip content={title}>
          <Link
            type="button"
            className={className}
            style={{ height: 40, width: 40 }}
            to={`/${path}/${subsection}/${code}`}
          >
            <CIcon icon={icon} />
          </Link>
        </CTooltip>
      ) : (
        <Link
          type="button"
          className={className}
          style={{ height: 40, width: 40 }}
          to={`/${path}/${subsection}/${code}`}
        >
          <CIcon icon={icon} />
        </Link>
      )}
    </>
  );
};

export const SearchButton = ({
  validators,
  handleSearch,
  textButton = "Buscar",
  className = "align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex form-group",
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
      <div className="col-12 col-sm-9 col-xl-7 my-1 ms-sm-auto">
        <InputForm
          type="search"
          name="search"
          className="form-control"
          placeholder="Buscar"
          aria-label="Buscar"
          autoComplete={""}
          value={search || ""}
          error={searchError || false}
          showError={false}
          onChange={handleOnChange}
        />
      </div>
      <div className="col-12 col-sm-2 ms-sm-1 my-1">
        <button
          className="btn btn-dark text-white w-100"
          type="submit"
          disabled={disable}
        >
          <CIcon className="d-none d-sm-inline-block" icon={cilSearch} />
          <p className="d-inline-block text-white d-sm-none m-0">
            {textButton}
          </p>
        </button>
      </div>
    </form>
  );
};

type IntervalButtonProps = {
  validators: any;
  handleSearch: (filter: any) => void;
  required: boolean;
  className?: string;
  textButton?: string;
  maxLength?: string;
};
export const IntervalButton = ({
  validators,
  handleSearch,
  required = false,
  className = "align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex",
  textButton = "Buscar",
  maxLength = undefined,
}: IntervalButtonProps) => {
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
          max={maxLength}
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
          max={maxLength}
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

type PaginateButtonsProps = {
  paginate: PaginateResponse | null;
  handleChange: (index: number) => void;
};

export const PaginateButtons = ({
  paginate,
  handleChange,
}: PaginateButtonsProps) => {
  const {
    hasPrevPage = false,
    prevPage = 0,
    page = 0,
    hasNextPage = false,
    nextPage = 0,
    totalPages = 1,
  } = paginate || {};

  const styles = {
    backgroundColor: "#98c3ed",
    border: "0",
  };

  const classes = { button: "btn btn-info mx-2 text-white" };

  return (
    <>
      {hasPrevPage && page > 2 ? (
        <button
          className={classes.button}
          style={{ ...styles }}
          onClick={() => handleChange(1)}
        >
          {"<<"}
        </button>
      ) : null}
      {hasPrevPage ? (
        <button
          className={classes.button}
          style={{ ...styles }}
          onClick={() => handleChange(prevPage || 0)}
        >
          {"<"}
        </button>
      ) : null}

      {page ? (
        <button className={classes.button} style={{ ...styles }}>
          {page}
        </button>
      ) : null}

      {hasNextPage ? (
        <button
          className={classes.button}
          style={{ ...styles }}
          onClick={() => handleChange(nextPage)}
        >
          {">"}
        </button>
      ) : null}

      {hasNextPage && totalPages !== page && totalPages !== page + 1 ? (
        <button
          style={{ ...styles }}
          className={classes.button}
          onClick={() => handleChange(totalPages)}
        >
          {">>"}
        </button>
      ) : null}
    </>
  );
};
