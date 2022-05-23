import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getTopicById, getTopics, postTopic, putTopic } from "./helpers";
import { Topic } from "./index";
import { PaginateResponse } from "../types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useTopics = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topicsAll, setTopicsAll] = React.useState<Topic[]>([]);
  const [topicInfo, setTopicInfo] = React.useState<Topic>(null);
  const [status, setStatus] = React.useState(Status.Loading);

  function setTopicById(id: string) {
    setStatus(Status.Loading);

    const token = getCookie("esagel_token") || "";
    getTopicById(token, id).then((response) => {
      if (response?._id) {
        setTopicInfo(response);
        setStatus(Status.Ready);
      }
    });
  }

  function getAllTopics() {
    const token = getCookie("esagel_token") || "";
    getTopics(token, {})
      .then((response: PaginateResponse) => {
        const { docs: topicsObtained = [] } = response || {};
        const enableTopics =
          topicsObtained.filter((topic: Topic) => topic.status === 1) || [];
        setTopics(enableTopics);
        setTopicsAll(enableTopics);
        setStatus(Status.Ready);
      })
      .catch(() => {
        setStatus(Status.Error);
      });
  }

  function searchTopicsByFilter(filter: string) {
    if (filter.length === 0) {
      setTopics(topicsAll);
    } else {
      const topicsFilter = topicsAll.filter((topic: Topic) => {
        const { name = "", description = "" } = topic || {};
        const regex = new RegExp(filter.toLowerCase());
        return regex.test(`${name} ${description}`.toLowerCase());
      });
      setTopics(topicsFilter);
    }
  }

  async function updateTopic(id: string, topic: any) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putTopic(token, id, topic)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Actualización Exitosa!",
            text: "Tema actualizado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  async function deleteTopic(id: string) {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    putTopic(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setTopics(topics.filter((topic: Topic) => topic._id !== id));
          setTopicsAll(topics.filter((topic: Topic) => topic._id !== id));
          const topicName = response?.updateTopic?.name || "";
          Swal.fire({
            title: "¡Todo salió bien!",
            icon: "success",
            text: `Tema ${topicName} eliminado con éxito`,
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "¡Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
      });
  }

  async function registerTopic(topic: any) {
    const token = getCookie("esagel_token") || "";
    setStatus(Status.Updating);
    return postTopic(token, topic)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Tema registrado éxitosamente",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: response?.message || "",
            timer: 2000,
            confirmButtonColor: "#ff0000",
          });
        }
        setStatus(Status.Ready);
        return response;
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return undefined;
      });
  }

  return {
    topics,
    deleteTopic,
    searchTopicsByFilter,
    registerTopic,
    updateTopic,
    setTopicById,
    topicInfo,
    getAllTopics,
    status,
  };
};
