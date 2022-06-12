const passRecomend = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})"
);
const emailRegex = new RegExp(/^[\w]{1}[\w.-]+@[\w-]{2,}(?:\.[\w-]{2,})+$/);
const strongRegularExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})"
);
const mediumRegularExp = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
);
const namesRegex = new RegExp(/^([a-zñáéíóúü'\s-])+[a-zñáéíóúü]+$/, "i");
const namesExtendRegex = new RegExp(/^([a-z0-9ñáéíóúü'\s-])+[a-z0-9ñáéíóúü]+$/, "i");
const descripRegex = new RegExp(/^(?!\s)[\wñáéíóúü@,.-\s]+$/, "i");

// prettier-ignore
const patternCard = [/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]
const patternDate = [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
const patterCvv = [/\d/, /\d/, /\d/, /\d/];

const numberRegex = new RegExp(/^([\d])+$/);
const cellphoneRegex = new RegExp(/^9\d{8}$/);
const docRegex = new RegExp(/^([a-zA-Z0-9-])+$/);
const phoneRegex = new RegExp(/^[\d-]+$/);
const rucRegex = new RegExp(/^(10|20)[0-9]{9}$/);

const maskDocuments = {
  DNI: new Array(8).fill(/\d/),
  CEX: new Array(15).fill(/[a-zA-Z0-9-]/),
  CDI: new Array(15).fill(/[a-zA-Z0-9-]/),
};

const docPatterns = {
  DNI: /(\d){8}/,
  CDI: /^([a-zA-Z0-9-]{5,15})/,
  CEX: /^([a-zA-Z0-9-]{5,15})/,
};

// prettier-ignore
const birthDatePattern = [/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]
const birthDateRegex = new RegExp(
  /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)(19[0-9]{2}|20[0-1][0-9])$/
);

export {
  birthDatePattern,
  birthDateRegex,
  cellphoneRegex,
  descripRegex,
  docPatterns,
  docRegex,
  emailRegex,
  maskDocuments,
  mediumRegularExp,
  namesRegex,
  namesExtendRegex,
  numberRegex,
  passRecomend,
  patterCvv,
  patternCard,
  patternDate,
  phoneRegex,
  rucRegex,
  strongRegularExp,
};
