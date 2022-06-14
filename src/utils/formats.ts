import { string } from "prop-types";
import { DateBody } from "../hooks/useDashboard/types";
import { months } from "./constants";

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

export const obtainFirstAndLastDayOfMonth = (
  {month="", year = new Date().getFullYear()}:{ month:string, year: number}
  ) => {
  switch (month.toLowerCase()) {
    case "enero":
      return {
        firstDay: `${year}-01-01`,
        endDay: `${year}-01-31`,
      };
    case "febrero":
      return {
        firstDay: `${year}-02-01`,
        endDay: `${year}-02-${year % 4 === 0 ? "29" : "28"}`,
      };
    case "marzo":
      return {
        firstDay: `${year}-03-01`,
        endDay: `${year}-03-31`,
      };
    case "abril":
      return {
        firstDay: `${year}-04-01`,
        endDay: `${year}-04-30`,
      };
    case "mayo":
      return {
        firstDay: `${year}-05-01`,
        endDay: `${year}-05-31`,
      };
    case "junio":
      return {
        firstDay: `${year}-06-01`,
        endDay: `${year}-06-30`,
      };
    case "julio":
      return {
        firstDay: `${year}-07-01`,
        endDay: `${year}-07-31`,
      };
    case "agosto":
      return {
        firstDay: `${year}-08-01`,
        endDay: `${year}-08-31`,
      };
    case "agosto":
      return {
        firstDay: `${year}-08-01`,
        endDay: `${year}-08-31`,
      };
    case "setiembre":
      return {
        firstDay: `${year}-09-01`,
        endDay: `${year}-09-30`,
      };
    case "octubre":
      return {
        firstDay: `${year}-10-01`,
        endDay: `${year}-10-31`,
      };
    case "noviembre":
      return {
        firstDay: `${year}-11-01`,
        endDay: `${year}-11-30`,
      };
    case "diciembre":
      return {
        firstDay: `${year}-12-01`,
        endDay: `${year}-12-31`,
      };
    default:
      return null;
  }
};

export const generateArrayDates = (quantity: number) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let auxIndex = 1;
  const array:DateBody[] = [];
  for (let i = 0; i < quantity; i++) {
    const objectMonth = {
      year: !months[currentMonth - i] ? currentYear - 1 : currentYear,
      month: !months[currentMonth - i]
        ? months[months.length - auxIndex]
        : months[currentMonth - i],
    };
    let monthParams = obtainFirstAndLastDayOfMonth(objectMonth);
    if (!months[currentMonth - i]) {
      auxIndex++;
    }
    array.push({
      startDate: `${monthParams?.firstDay}T00:00:00.0+00:00`,
      endDate: `${monthParams?.endDay}T23:59:59.999+00:00`,
    });
  }
  return array;
};