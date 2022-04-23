import ENVIROMENTS from '../../enviroments/env'

const {GENERAL_API} = ENVIROMENTS

export const getPositions = (token:string) => {
    fetch(`${GENERAL_API}/positions`, {method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
}

export const getDocumentTypes = (token:string) => {
    fetch(`${GENERAL_API}/documents`, {method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
}

