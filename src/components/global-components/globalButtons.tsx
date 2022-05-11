import { Link } from "react-router-dom";
import * as React from "react";
import useForm from "../../hooks/useForm";
import { InputForm } from "./inputForm";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";

export const RedirectionButton = ({
  redirection = "",
  classContainer = "col-12 col-sm-3 col-md-2 col-lg-2",
  classButton = "btn btn-block btn-success w-100 h-auto text-white",
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
  subsection = "editar",
}) => {
  return (
    <Link
      type="button"
      className={className}
      style={{ height: 40, width: 40 }}
      to={`/${path}/${subsection}/${code}`}
    >
      <CIcon icon={cilPencil} />
    </Link>
  );
};

export const SearchButton = ({
  validators,
  handleSearch,
  textButton = "Buscar",
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
    <form
      className="align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex"
      onSubmit={handleOnSubmit}
    >
      <div className="col-12 col-sm-6 my-1 ms-sm-auto">
        <InputForm
          type="search"
          name="search"
          className="form-control"
          placeholder="Buscar"
          aria-label="Search"
          value={search}
          error={searchError}
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

export const SubmitButton = ({
  disabled = undefined,
  children,
  className = "btn btn-block btn-info w-100",
  style = undefined,
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
