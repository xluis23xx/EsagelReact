import * as React from "react";
import { getCookie } from "../../utils/cookies";
import Swal from "sweetalert2";

import { getTopicById, getTopics, postTopic, putTopic } from "./helpers";
import { Topic } from "./index";
import { BodyParams, PaginateParams, PaginateResponse } from "../types";
import { TopicResponse } from "./types";

export enum Status {
  Loading,
  Ready,
  Updating,
  Error,
}

export const useTopics = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [topicInfo, setTopicInfo] = React.useState<Topic | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const [paginateData, setPaginateData] = React.useState<PaginateResponse| null>(null)
  const [searchFilter, setSearchFilter] = React.useState<BodyParams>({
    filter: "",
    status: null
  })

  function setTopicById(id: string) {
    setStatus(Status.Loading);
    const token = getCookie("esagel_token") || "";
    getTopicById(token, id).then((response) => {
      if (response?.status === 200) {
        setTopicInfo(response?.doc || null);
        setStatus(Status.Ready);
      }
    });
  }

  async function getTopicsByFilter(
    { filter, status }: BodyParams,
    {limit, pageSize}: PaginateParams
    ): Promise<PaginateResponse> {
    const token = getCookie("esagel_token") || "";
    return getTopics(token,{filter, status}, {limit, pageSize})
    .then((response: PaginateResponse) => {
      if(response?.status===200){
        const { docs: topicsObtained = [] } = response || {};
        setTopics(topicsObtained);
        setPaginateData(response);
      }else{
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
    .catch((error) => {
      setStatus(Status.Error);
      return error;
    });
  }

  async function updateTopic(id: string, topic: any): Promise<TopicResponse> {
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
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function deleteTopic(id: string): Promise<TopicResponse> {
    setStatus(Status.Updating);
    const token = getCookie("esagel_token") || "";
    return putTopic(token, id, { status: 0, isDelete: true })
      .then((response) => {
        if (response?.status === 201 || response?.status === 200) {
          setTopics(topics.filter((topic: Topic) => topic._id !== id));
          const topicName = response?.doc?.name || "";
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
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  async function registerTopic(topic: any): Promise<TopicResponse> {
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
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo ocurrió!",
          text: "Ocurrió un error inesperado",
          timer: 2000,
          confirmButtonColor: "#ff0000",
        });
        setStatus(Status.Ready);
        return error;
      });
  }

  function changePage (index: number) {
    getTopicsByFilter(searchFilter, {limit: 20, pageSize:index})
  }

  return {
    topics,
    deleteTopic,
    registerTopic,
    updateTopic,
    setTopicById,
    topicInfo,
    getTopicsByFilter,
    paginateData,
    setSearchFilter,
    changePage,
    status,
  };
};
