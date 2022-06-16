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
import { formatExtendNames } from "../../utils/errors";
import { ExportButtons } from "../global-components/exportButtons";
import {
  PaginateButtons,
  RedirectionButton,
  SearchButton,
} from "../global-components/globalButtons";
import { savePathname } from "../../utils/location";

const TopicsComponent = () => {
  const {
    topics,
    deleteTopic,
    getTopicsByFilter,
    setSearchFilter,
    changePage,
    paginateData,
    status,
  } = useTopics();
  const [visible, setVisible] = React.useState(false);
  const [topicId, setTopicId] = React.useState("");

  React.useEffect(() => {
    savePathname();
    setSearchFilter({
      filter: "",
      status: 1,
    });
    getTopicsByFilter({ filter: "", status: 1 }, { limit: 20, pageSize: 1 });
  }, []);

  const validators = {
    required: false,
    validator: formatExtendNames(),
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

  const handleSearch = ({ search }: { search: string | null }) => {
    let filter = "";
    if (search) {
      filter = search;
    }
    getTopicsByFilter({ filter, status: 1 }, { limit: 20, pageSize: 1 });
  };

  const tableExportId = "topics-table";

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Descripción", key: "description" },
    { label: "Estado", key: "status" },
  ];

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
                <ExportButtons
                  dataReport={topics}
                  tableId={tableExportId}
                  documentName={"topics"}
                  headers={headers}
                />
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
                  <table className="table" id={tableExportId}>
                    <thead>
                      <tr>
                        <th>N°</th>
                        {headers
                          ? headers.map((header) => (
                              <th key={header.label}>{header.label}</th>
                            ))
                          : null}
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map((topic: Topic, index: number) => {
                        const { _id = "", name, description, status } = topic;
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
              {topics.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}
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
                    className="text-white"
                    onClick={() => {
                      setTopicId("");
                      setVisible(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => removeTopic(topicId)}
                  >
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
