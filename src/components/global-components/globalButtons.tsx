import { Link } from "react-router-dom";
import * as React from "react";
import useForm from "../../hooks/useForm";
import { InputForm } from "./inputForm";

export const RedirectionButton = ({
  redirection = "",
  classContainer = "col-12 col-sm-3 col-lg-2",
  classButton = "btn btn-block btn-success w-100 h-auto text-white",
  textButton = "Nuevo",
}) => (
  <div className={classContainer}>
    <Link className={classButton} to={redirection}>
      {textButton}
    </Link>
  </div>
);

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
      <div className="col-12 col-sm-8 my-1">
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
        className="btn btn-success text-white col-12 col-sm-3 my-1 ms-sm-auto"
        type="submit"
        disabled={disable}
      >
        {textButton}
      </button>
    </form>
  );
};
