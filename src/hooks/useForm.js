/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

const VALUE = "value";
const ERROR = "error";

const REQUIRED_FIELD_ERROR = "Este campo es requerido";
const EMPTY_FIELD_ERROR = "No se permiten espacios";
const MIN_2_CARACTS_FIELD_ERROR = "Se requiere mínimo 2 caracteres";
const MIN_6_CARACTS_FIELD_ERROR = "Se requiere mínimo 6 caracteres";
const TEXT_INVALID_ERROR = "Este valor no está permitido";
const MIN_AGE_ERROR = "No cumple con la edad mínima";
const MAX_AGE_ERROR = "¿Está seguro que tiene esa edad?";

function isObject(value) {
  return value !== null && typeof value === "object";
}

function getPropValues(stateSchema, prop) {
  if (!isObject(stateSchema) || !prop) {
    throw new Error("Invalid Parameter passed.");
  }

  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    accumulator[curr] = stateSchema[curr][prop];
    return accumulator;
  }, {});
}

function isRequiredField(value, isRequired) {
  return !value && isRequired ? REQUIRED_FIELD_ERROR : "";
}

function notSpaces(value) {
  return value.indexOf(" ") >= 0 ? EMPTY_FIELD_ERROR : "";
}

function min2Caracts(value) {
  return value.length < 2 && value.length > 0 ? MIN_2_CARACTS_FIELD_ERROR : "";
}

function min6Caracts(value) {
  return value.length >= 1 && value.length < 6 ? MIN_6_CARACTS_FIELD_ERROR : "";
}

const calculateAge = (date) => {
  const birthday = new Date(date);
  const currentDate = new Date();

  const time =
    (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365;
  return time;
};

function minAge(value) {
  return calculateAge(value) < 5 ? MIN_AGE_ERROR : "";
}
function maxAge(value) {
  return calculateAge(value) > 99 ? MAX_AGE_ERROR : "";
}

function invalidText(value) {
  const lowerValue = value.toLowerCase();
  return lowerValue.match(/undefined/) || lowerValue === "null"
    ? TEXT_INVALID_ERROR
    : "";
}

const StateValues = [{ value: "" | null, error: "" }];

/**
 * Custom hooks to validate your Form...
 *
 * @param stateSchema model you stateSchema.
 * @param stateSchemaValidator model your validation.
 * @param submitFormCallback function to be execute during form submission.
 */
function useForm(stateSchema, stateSchemaValidator, submitFormCallback) {
  const [state, setStateSchema] = React.useState(stateSchema);
  const [values, setValues] = React.useState(getPropValues(state, VALUE));
  const [errors, setErrors] = React.useState(getPropValues(state, ERROR));
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);

  // Get a local copy of stateSchema
  React.useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true); // Disable button in initial render.
  }, []);

  // Used to disable submit button if there's a value in errors
  // or the required field in state has no value.
  // Wrapped in useCallback to cache the function to avoid intensive memory leaked
  // in every re-render in component
  const validateErrorState = React.useCallback(
    () => Object.values(errors).some((error) => error),
    [errors]
  );

  // For every change in our state this will be fired
  // To be able to disable the button
  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]);

  // Event handler for handling changes in input.
  const handleOnChange = React.useCallback(
    (event) => {
      setIsDirty(true);
      const { value, name } = event.target;
      const validatorState = stateSchemaValidator;

      // Making sure that stateSchemaValidator name is same in
      // stateSchema
      if (!validatorState[name]) return;

      const fieldValid = validatorState[name];

      let errorObj = "";

      errorObj = isRequiredField(value, fieldValid?.required);

      if (fieldValid.nospaces && errorObj === "") {
        errorObj = notSpaces(value);
      }

      if (fieldValid.min2caracts && errorObj === "") {
        errorObj = min2Caracts(value);
      }

      if (fieldValid.min6caracts && errorObj === "") {
        errorObj = min6Caracts(value);
      }

      if (fieldValid.invalidtext && errorObj === "") {
        errorObj = invalidText(value);
      }

      if (fieldValid.minAge && errorObj === "") {
        errorObj = minAge(value);
      }

      if (fieldValid.maxAge && errorObj === "") {
        errorObj = maxAge(value);
      }

      // Prevent running this function if the value is required field
      if (
        errorObj === "" &&
        fieldValid?.validator &&
        isObject(fieldValid.validator)
      ) {
        const {
          validator: { func: testFunc, error },
        } = fieldValid;

        // Test the function callback if the value is meet the criteria
        if (!testFunc(value)) {
          errorObj = error;
        }
      }

      setValues((prevState) => ({ ...prevState, [name]: value }));
      setErrors((prevState) => ({ ...prevState, [name]: errorObj }));
    },
    [stateSchemaValidator, values]
  );

  const handleOnSubmit = React.useCallback(
    (event) => {
      event?.preventDefault();

      // Making sure that there's no error in the state
      // before calling the submit callback function
      if (!validateErrorState()) {
        submitFormCallback(values);
      }
    },
    [validateErrorState, submitFormCallback, values]
  );

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    disable,
    setValues,
    setErrors,
  };
}

export default useForm;
export { StateValues };
