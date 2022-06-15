export const getUbigeo = (item: string) => {
  const response = new Promise((resolve, reject) => {
    fetch(`https://pre.ecoid.pe/get_ubigeo/${item}?v=${new Date().getTime()}`)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
  return response;
};


export const getConsultaRuc = (ruc: string) => 
   fetch(`https://api.apis.net.pe/v1/ruc/?numero=${ruc}`, {
      method: "GET",
      cache:"no-cache",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Authorization": `Bearer apis-token-2275.9h1FqM5wJrmVdKLMTnpLVRdsEAB1aNeq`,
      },
    })
    .then((res)=> res.json())
    .catch((err) =>err)
