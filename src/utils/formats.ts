type FormatDate = {
  order?: number; // 0 dia-mes-año | 1 año-mes-dia
  date: string;
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
        : null;
    }
    if (order === 1) {
      return year && month && day
        ? `${year}${separator}${month}${separator}${day}`
        : null;
    }
  }
  return null;
};
