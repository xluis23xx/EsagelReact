/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { Link } from "react-router-dom";
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
import useForm from "../../hooks/useForm";
import { InputForm } from "../global-components/inputForm";
import { SharedButtons } from "../global-components/sharedButtons";

const TopicsComponent = () => {
  const { topics, deleteTopic, getAllTopics, searchTopicsByFilter, status } =
    useTopics();
  const [visible, setVisible] = React.useState(false);
  const [topicId, setTopicId] = React.useState("");

  React.useEffect(() => {
    getAllTopics();
  }, []);

  const stateSchema = {
    search: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    search: {
      required: false,
      validator: formatDescription(),
      invalidtext: true,
    },
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

  const {
    values: { search },
    errors: { search: searchError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, handleSearch);

  return (
    <>
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link
            className="btn btn-block btn-success w-100 h-auto text-white"
            to="/temas/nuevo"
          >
            Nuevo
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;TEMAS
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <SharedButtons />
                <form
                  className="align-items-end my-1 col-12 col-md-6 flex-md-row d-sm-flex"
                  onSubmit={handleOnSubmit}
                >
                  <div className="col-12 col-sm-8">
                    <InputForm
                      type="search"
                      name="search"
                      className="form-control"
                      placeholder="Buscar"
                      aria-label="Search"
                      value={search}
                      error={searchError}
                      showError={false}
                      onChange={handleOnChange}
                    />
                  </div>
                  <button
                    className="btn btn-success text-white col-12 col-sm-4 my-1 my-sm-0"
                    type="submit"
                    disabled={disable}
                  >
                    Buscar
                  </button>
                </form>
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
