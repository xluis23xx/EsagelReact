/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { TopicItem } from "./_children/topic";
import { Topic, Status, useTopics } from "../../hooks/useTopics";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { formatDescription } from "../../utils/errors";
import { SharedButtons } from "../global-components/sharedButtons";
import {
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";

const TopicsComponent = () => {
  const { topics, deleteTopic, getAllTopics, searchTopicsByFilter, status } =
    useTopics();
  const [visible, setVisible] = React.useState(false);
  const [topicId, setTopicId] = React.useState("");

  React.useEffect(() => {
    getAllTopics();
  }, []);

  const validators = {
    required: false,
    validator: formatDescription(),
    invalidtext: true,
  };

  const removeTopic = (id: string) => {
    setVisible(!visible);
    if (!visible) {
      setTopicId(id);
    } else if (visible && topicId) {
      deleteTopic(id);
      setTopicId("");
    }
  };

  const handleSearch = (data) => {
    searchTopicsByFilter(data.search);
  };

  return (
    <>
      <div className="row mb-3">
        <RedirectionButton redirection="/temas/nuevo" />
      </div>
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;TEMAS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearch}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                topics.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map((topic: Topic, index: number) => {
                        const { _id, name, description, status } = topic;
                        return (
                          <TopicItem
                            key={index}
                            code={_id}
                            name={name}
                            description={description}
                            status={status}
                            orderNumber={index + 1}
                            handleRemove={removeTopic}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <CModal
                visible={visible}
                onClose={() => {
                  setTopicId("");
                  setVisible(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Eliminar Tema</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres eliminar este tema?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setTopicId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton color="danger" onClick={() => removeTopic(topicId)}>
                    Eliminar
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicsComponent;
