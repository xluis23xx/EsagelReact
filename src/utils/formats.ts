type FormatDate = {
  date: string | Date | undefined| null;
  order?: number; // 0 dia-mes-año | 1 año-mes-dia
  separator?: string;
};

export const setFormatDate = ({
  order = 0,
  date,
  separator = "-",
}: FormatDate) => {
  if (date) {
    const convertDate = date ? new Date(date) : "";
    const year = convertDate ? convertDate.getFullYear() : "";
    let month = convertDate ? convertDate.getMonth() + 1 : "";
    if (month < 10) {
      month = `0${month}`;
    }
    let day = convertDate ? convertDate.getDate() : "";
    if (day < 10) {
      day = `0${day}`;
    }
    if (order === 0) {
      return year && month && day
        ? `${day}${separator}${month}${separator}${year}`
        : "";
    }
    if (order === 1) {
      return year && month && day
        ? `${year}${separator}${month}${separator}${day}`
        : "";
    }
  }
  return "";
};

type FormatCharacter = {
  character: string;
  slice?: number;
  isSuspent?: boolean;
};

export const setFormatCharacters = ({
  character = "",
  slice = 50,
  isSuspent = true,
}: FormatCharacter): string => {
  if (character) {
    if (isSuspent) {
      return character.length >= slice
        ? `${character.substring(0, slice - 3)}...`
        : character;
    } else {
      return character.length >= slice
        ? `${character.substring(0, slice)}`
        : character;
    }
  } else {
    return "";
  }
};


export const formatRolName = (rol: string) => {
  switch (rol) {
    case "user":
      return "Usuario";
    case "admin":
      return "Administrador";
    case "moderator":
      return "Moderador";
    default:
      return "";
  }
};

export const extendedDate = () => {
  const newDate = new Date();
  const dateFormat = `${
    newDate.getDate() + 1 >= 10
      ? newDate.getDate() + 1
      : `0${newDate.getDate() + 1}`
  }-${
    newDate.getMonth() + 1 >= 10
      ? newDate.getMonth() + 1
      : `0${newDate.getMonth() + 1}`
  }-${newDate.getFullYear()} ${
    newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`
  } ${
    newDate.getMinutes() >= 10
      ? newDate.getMinutes()
      : `0${newDate.getMinutes()}`
  } ${
    newDate.getSeconds() >= 10
      ? newDate.getSeconds()
      : `0${newDate.getSeconds()}`
  }`;
  return dateFormat;
};