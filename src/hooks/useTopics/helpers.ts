import ENVIROMENTS from "../../enviroments/env";

import { GetTopic, GetTopics } from "./types";

const { GENERAL_API } = ENVIROMENTS;

export const getTopics = (token: string): Promise<GetTopics> =>
  fetch(`${GENERAL_API}/topics`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((res) => res.json());

export const getTopicById = (token: string, id: string): Promise<GetTopic> =>
  fetch(`${GENERAL_API}/topics/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const postTopic = (token: string, topic: any) =>
  fetch(`${GENERAL_API}/topics`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      ...topic,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());

export const putTopic = (token: string, id: string, topic: any) =>
  fetch(`${GENERAL_API}/topics/${id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({
      ...topic,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  }).then((res) => res.json());
