export const getUbigeo = (item: string) => {
  const response = new Promise((resolve, reject) => {
    fetch(`https://pre.ecoid.pe/get_ubigeo/${item}?v=${new Date().getTime()}`)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
  return response;
};
