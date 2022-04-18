import {
  birthDateRegex,
  cellphoneRegex,
  descripRegex,
  emailRegex,
  namesRegex,
  numberRegex,
} from "./regex";

export const formatEmail = () => ({
  func: (value) => emailRegex.test(value) && !value.match(/@facebook.com/),
  error: "Correo electrónico Inválido",
});

export const formatPass = () => ({
  func: (value) => value.length >= 6,
  error: "Mínimo 6 caracteres",
});
export const formatNames = () => ({
  func: (value) => value === "" || namesRegex.test(value),
  error: "Formato inválido, solo letras",
});

export const formatSecondLastName = () => ({
  func: (value) =>
    value === "" || (value.length >= 2 && namesRegex.test(value)),
  error: "Formato inválido, solo letras",
});

export const formatPhone = () => ({
  func: (value) =>
    value === "" || (value.length >= 2 && numberRegex.test(value)),
  error: "Formato inválido. Solo números",
});

export const formatDate = () => ({
  func: (value) => value === "" || (value && birthDateRegex.test(value)),
  error: "El formato de la fecha es incorrecto.",
});

const calculateAge = (date) => {
  const birthday = new Date(date);
  const currentDate = new Date();

  const time = parseInt(
    (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365,
    10
  );
  return time;
};

export const minBirthDay = () => ({
  func: (value) => value === null || calculateAge(value) > 4,
  error: "No cumple con la edad mínima",
});

export const maxBirthDay = () => ({
  func: (value) => value === null || calculateAge(value) < 100,
  error: "¿Está seguro que tiene esa edad?",
});

export const formatCellphone = () => ({
  func: (value) => cellphoneRegex.test(value),
  error: "Formato inválido.",
});

export const acceptCheckTerms = () => ({
  func: (value) => value !== "1",
  error:
    "Para ser parte de nuestra comunidad es necesario aceptar los términos y condiciones",
});

export const acceptCheckTermsPay = () => ({
  func: (value) => value === "no",
  error:
    "Para continuar con le proceso de pago es necesario aceptar las condiciones de servicio y las políticas de privacidad",
});

export const formatDescription = () => ({
  func: (value) =>
    value === "" || (value.length >= 2 && descripRegex.test(value)),
  error: "Contiene caracteres no permitidos",
});

export const formatCvv = () => ({
  func: (value) => /^(\d{3,4})/.test(value),
  error: "Mínimo 3 caracteres",
});

export const formatExpire = () => ({
  func: (value) =>
    /^(0[1-9]|1[0-2])\/?(((202)\d{1}|(202)\d{1})|(2)\d{1})$/.test(value),
  error: "Formato inválido",
});
