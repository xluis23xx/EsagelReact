/* eslint-disable no-useless-escape */
import {
  birthDateRegex,
  cellphoneRegex,
  descripRegex,
  emailRegex,
  namesRegex,
  numberRegex,
  rucRegex,
} from "./regex";

export const formatEmail = () => ({
  func: (value: string) =>
    emailRegex.test(value) && !value.match(/@facebook.com/),
  error: "Correo electrónico Inválido",
});

export const formatDocument = () => ({
  func: (value: string) =>
    !value.match(/00000000|12345678/) &&
    /^(?:\d{8}|[a-zA-Z0-9]{9,15})$/.test(value),
  error: "Formato inválido",
});

export const formatPass = () => ({
  func: (value) => value.length >= 6,
  error: "Mínimo 6 caracteres",
});
export const formatNames = () => ({
  func: (value) => value === "" || namesRegex.test(value),
  error: "Formato inválido, solo letras",
});

export const formatRuc = () => ({
  func: (value) => value === "" || rucRegex.test(value),
  error: "Formato inválido.",
});

export const formatTax = () => ({
  func: (value) => {
    if (value) {
      if (value >= 0 && value <= 1) {
        return true;
      }
    } else {
      return true;
    }
  },
  error: "El igv debe estar entre 0 y 1.",
});

export const formatURL = () => ({
  func: (value) =>
    value === "" ||
    /(\w+):\/\/(([\w]+)@|(\w+):(\w+)@|)((.*)\.|)([\w\-]+)\.((\w{3}\.\w{2})|(\w{3}))(:([0-9]+)|)\/(([\w\/\.]+|)(\?([\w\=\%\&]+)|)(\#(.*)|)|)/.test(
      value
    ),
  error: "Formato inválido.",
});

export const formatSecondLastName = () => ({
  func: (value) =>
    value === "" || (value.length >= 2 && namesRegex.test(value)),
  error: "Formato inválido, solo letras",
});

export const formatPhone = () => ({
  func: (value) =>
    value === "" || (value.length >= 7 && numberRegex.test(value)),
  error: "Formato inválido. Solo números",
});

export const formatDate = () => ({
  func: (value) => value === "" || (value && birthDateRegex.test(value)),
  error: "El formato de la fecha es incorrecto.",
});

const calculateAge = (date: Date) => {
  const birthday = new Date(date);
  const currentDate = new Date();

  const time = Math.floor(
    (currentDate.getTime() - birthday.getTime()) / (1000 * 3600 * 24) / 365
  );
  return time;
};

export const minBirthDay = () => ({
  func: (value) => value === null || calculateAge(value) > 17,
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
