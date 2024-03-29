/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { formatExtendNames, formatRuc } from "../../utils/errors";

import { Order, OrderDetail, Status, useOrders } from "../../hooks/useOrders";
import CIcon from "@coreui/icons-react";

import { SearchButton, SubmitButton } from "../global-components/globalButtons";
import { Client, useClients } from "../../hooks/useClients";

import {
  CBadge,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { cilHamburgerMenu, cilSearch, cilTrash } from "@coreui/icons";

import { AuthContext } from "../../context/AuthContext";
import { InputForm } from "../global-components/inputForm";
import { DocumentType, useDocumentTypes } from "../../hooks/useDocuments";
import { Course, useCourses } from "../../hooks/useCourses";
import { SettingsContext } from "../../context/SettingsContext";
import { Center, useCenters } from "../../hooks/useCenters";

const NewOrderComponent = () => {
  const { user } = React.useContext<any>(AuthContext);
  const { config } = React.useContext<any>(SettingsContext);

  const { registerOrder, status } = useOrders();

  const {
    getClientsByFilter,
    setSearchFilter: setSearchClientFilter,
    clients,
  } = useClients();

  const {
    getCoursesByFilter,
    setSearchFilter: setSearchCourseFilter,
    courses,
  } = useCourses();

  const { getCentersByFilter, centers } = useCenters();

  const [visibleClientModal, setVisibleClientModal] = React.useState(false);
  const [visibleCoursesModal, setVisibleCoursesModal] = React.useState(false);

  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null
  );

  const [selectedCourses, setSelectedCourses] = React.useState<OrderDetail[]>(
    []
  );
  const [selectedCoursesIds, setSelectedCoursesIds] = React.useState<string[]>(
    []
  );
  const { getDocumentTypesByFilter, documents } = useDocumentTypes();

  const [showClientError, setShowClientError] = React.useState<boolean>(false);
  const [subtotal, setSubtotal] = React.useState<number>(0);

  const history = useHistory();

  React.useEffect(() => {
    getDocumentTypesByFilter({ filter: "", status: 1 }, { limit: 100 });
    setSearchClientFilter({
      filter: "",
      status: 1,
    });
    getClientsByFilter({ filter: "", status: 1 }, { limit: 5, pageSize: 1 });
    setSearchCourseFilter({
      filter: "",
      status: 1,
    });
    getCoursesByFilter({ filter: "", status: 1 }, { limit: 5, pageSize: 1 });
    getCentersByFilter({ filter: "", status: 1 }, { limit: 100 });
  }, []);

  React.useEffect(() => {
    const clientForOrder = JSON.parse(
      sessionStorage.getItem("client_for_order") || "{}"
    );
    if (Object.keys(clientForOrder).length > 0) {
      setSelectedClient(clientForOrder);
    }
    sessionStorage.removeItem("client_for_order");
  }, []);

  React.useEffect(() => {
    if (selectedCourses.length > 0) {
      let subtotalAmount = 0;
      selectedCourses.map((item: OrderDetail) => {
        subtotalAmount = subtotalAmount + (item?.amount || 0);
        return true;
      });
      setSubtotal(subtotalAmount);
    } else {
      setSubtotal(0.0);
    }
  }, [selectedCourses]);

  const stateSchema = {
    documentType: { value: "", error: "" },
    documentNumber: { value: "", error: "" },
    center: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    documentType: {
      required: true,
    },
    center: {
      required: true,
    },
    documentNumber: {
      required: true,
      validator: formatRuc(),
    },
  };

  const onSubmitForm = (data: Order) => {
    const order = {
      seller: user?._id || null,
      client: selectedClient?._id || null,
      documentType:
        selectedClient?.documentType?.name === "RUC"
          ? "Factura"
          : data?.documentType || null,
      documentNumber:
        selectedClient?.documentType?.name === "RUC"
          ? selectedClient?.documentNumber
          : data?.documentType === "Factura"
          ? data?.documentNumber
          : null,
      center: data?.center || null,
      subtotal: subtotal || 0,
      percentIva: config?.tax ? config?.tax : null,
      amountInIva: config?.tax ? config?.tax * subtotal : null,
      total: config?.tax ? subtotal + subtotal * config?.tax : null,
      status: 1,
      orderLines: selectedCourses || [],
    };
    registerOrder(order).then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        history.replace("/pedidos");
      }
    });
  };

  const validators = {
    required: false,
    validator: formatExtendNames(),
    invalidtext: true,
  };

  const {
    values: { documentType, documentNumber, center },
    errors: {
      documentType: documentTypeError,
      documentNumber: documentNumberError,
      center: centerError,
    },
    handleOnChange,
    handleOnSubmit,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const handleSearchClients = ({ search }: { search: string | null }) => {
    let filter = "";
    if (search) {
      filter = search;
    }
    getClientsByFilter({ filter, status: 1 }, { limit: 5, pageSize: 1 });
  };

  const handleSearchCourses = ({ search }: { search: string | null }) => {
    let filter = "";
    if (search) {
      filter = search;
    }
    getCoursesByFilter({ filter, status: 1 }, { limit: 5, pageSize: 1 });
  };

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;NUEVO PEDIDO
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="fw-bold">
                  Los campos con (*) son obligatorios
                </label>
                <br />
              </div>

              <form className="row" onSubmit={handleOnSubmit}>
                <div className="form-group mt-1 col-sm-6 col-xl-3">
                  <label className="form-label" htmlFor="client">
                    Cliente *
                  </label>
                  <div className="d-flex">
                    <input
                      required
                      className={`w-100 ${
                        showClientError ? "border border-danger" : ""
                      }`}
                      placeholder="Seleccione..."
                      name="client"
                      value={
                        `${selectedClient?.name ? selectedClient?.name : ""}${
                          selectedClient?.lastname
                            ? ` ${selectedClient?.lastname}`
                            : ""
                        }` || ""
                      }
                      onChange={(e) => {
                        if (e.target.value) {
                          setShowClientError(true);
                        } else {
                          setShowClientError(false);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          setShowClientError(true);
                        } else {
                          setShowClientError(false);
                        }
                      }}
                      disabled={true}
                    />
                    <button
                      type="button"
                      className="btn btn-success text-white"
                      onClick={() => setVisibleClientModal(true)}
                      disabled={selectedCourses?.length > 0}
                    >
                      <CIcon icon={cilSearch}></CIcon>
                    </button>
                  </div>
                  {showClientError ? (
                    <p
                      className="w-100 pb-0 mb-0 text-danger"
                      style={{ fontSize: 15 }}
                    >
                      Este campo es requerido.
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-3">
                  <label className="form-label" htmlFor="documentType">
                    Tipo de Comprobante *
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    required
                    disabled={
                      status === Status.Updating ||
                      selectedClient?.documentType?.name === "RUC"
                    }
                    value={
                      selectedClient?.documentType?.name === "RUC"
                        ? "Factura"
                        : documentType || ""
                    }
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      !selectedClient && documentTypeError
                        ? "border border-danger"
                        : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {documents.length > 0
                      ? documents.map((pos: DocumentType) => {
                          if (pos?.operation === "comprobante") {
                            return (
                              <option key={pos.name} value={`${pos.name}`}>
                                {pos?.name?.toUpperCase()}
                              </option>
                            );
                          }
                          return null;
                        })
                      : null}
                  </select>
                </div>

                <div className="form-group mt-1 col-sm-6 col-xl-3">
                  <label className="form-label" htmlFor="status">
                    Estado *
                  </label>
                  <InputForm
                    name="status"
                    value={"Pendiente"}
                    disabled={true}
                  />
                </div>
                <div className="form-group mt-1 col-sm-6 col-xl-3">
                  <label className="form-label" htmlFor="center">
                    Centro *
                  </label>
                  <select
                    id="center"
                    name="center"
                    required
                    disabled={status === Status.Updating}
                    value={center || ""}
                    onChange={handleOnChange}
                    onBlur={handleOnChange}
                    className={`btn border-secondary btn-default w-100 ${
                      centerError ? "border border-danger" : ""
                    }`}
                  >
                    <option value="">Seleccione</option>
                    {centers.length > 0
                      ? centers.map((cen: Center) => (
                          <option
                            key={cen.branchName}
                            value={`${cen.branchName}`}
                          >
                            {cen?.branchName?.toUpperCase()}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                {selectedClient?.documentType?.name === "RUC" ||
                documentType === "Factura" ? (
                  <div className="form-group mt-1 col-sm-6 col-xl-3">
                    <label className="form-label" htmlFor="documentNumber">
                      RUC *
                    </label>
                    <InputForm
                      type="text"
                      required
                      maxLength={11}
                      placeholder="Nro. Ruc"
                      name="documentNumber"
                      value={
                        selectedClient?.documentType?.name === "RUC"
                          ? selectedClient?.documentNumber || ""
                          : documentNumber || ""
                      }
                      onChange={handleOnChange}
                      disabled={
                        selectedClient?.documentType?.name === "RUC" ||
                        status === Status.Updating
                      }
                      error={documentNumberError}
                      showError={false}
                    />
                  </div>
                ) : null}
                <div className="form-group mt-1 col-sm-6 col-xl-3">
                  <label className="form-label" htmlFor="seller">
                    Vendedor:
                  </label>
                  <InputForm
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Vendedor"
                    name="seller"
                    value={`${
                      user?.employee?.name ? user?.employee?.name : ""
                    }${
                      user?.employee?.lastname
                        ? ` ${user?.employee?.lastname}`
                        : ""
                    }`}
                    onChange={handleOnChange}
                    disabled={true}
                  />
                </div>
                {selectedClient?.documentType?.name === "RUC" ||
                documentType === "Factura" ? (
                  <div className="col-12 mt-3 d-sm-none d-xl-block col-xl-3" />
                ) : (
                  <div className="col-12  mt-3 d-sm-none d-xl-block col-xl-6" />
                )}
                <div className="form-group mt-3 col-sm-6 col-xl-3 d-flex">
                  <button
                    type="button"
                    onClick={() => setVisibleCoursesModal(true)}
                    disabled={!selectedClient}
                    className="ms-auto btn btn-success text-white w-100 mt-auto"
                  >
                    Buscar Cursos&nbsp;<CIcon icon={cilSearch}></CIcon>
                  </button>
                </div>

                <div
                  className="w-100 overflow-auto mt-3"
                  style={{ minHeight: 200 }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ minWidth: 60 }}>N°</th>
                        <th style={{ minWidth: 60 }}>Curso</th>
                        <th style={{ minWidth: 60 }}>Precio Venta</th>
                        <th style={{ minWidth: 60 }}>Vacantes</th>
                        <th style={{ minWidth: 60 }}>Cantidad</th>
                        <th style={{ minWidth: 60 }}>Descuento</th>
                        <th style={{ minWidth: 60 }}>Importe</th>
                        <th style={{ minWidth: 60 }}>Opción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourses?.length > 0
                        ? selectedCourses.map(
                            (item: OrderDetail, index: number) => {
                              const {
                                name,
                                price = 0,
                                _id,
                                course = null,
                                quantity = 1,
                                discount = 0,
                                amount = 0,
                              } = item;
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{name || ""}</td>
                                  <td>{price?.toFixed(2) || "gratis"}</td>
                                  <td>{course?.vacanciesNumber || ""}</td>
                                  <td>
                                    <input
                                      type={"number"}
                                      name="quantity"
                                      className="form-control"
                                      value={quantity}
                                      disabled={
                                        selectedClient?.documentType?.name !==
                                        "RUC"
                                      }
                                      onChange={(e) => {
                                        if (e.target.value === "") {
                                          setSelectedCourses([
                                            ...selectedCourses.map((item) =>
                                              item._id === _id
                                                ? {
                                                    ...item,
                                                    discount: 0,
                                                    amount:
                                                      (item?.price || 0) *
                                                      Number(
                                                        e.target.value || 1
                                                      ),
                                                  }
                                                : item
                                            ),
                                          ]);
                                        } else if (
                                          Number(e.target.value) <
                                          (course?.vacanciesNumber || 0)
                                        ) {
                                          setSelectedCourses([
                                            ...selectedCourses.map((item) =>
                                              item._id === _id
                                                ? {
                                                    ...item,
                                                    quantity: Number(
                                                      e.target.value
                                                    ),
                                                    amount:
                                                      (item?.price || 0) *
                                                        Number(e.target.value) -
                                                      discount,
                                                  }
                                                : item
                                            ),
                                          ]);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type={"number"}
                                      name="discount"
                                      value={discount}
                                      className="form-control"
                                      onChange={(e) => {
                                        if (e.target.value === "") {
                                          setSelectedCourses([
                                            ...selectedCourses.map((item) =>
                                              item._id === _id
                                                ? {
                                                    ...item,
                                                    discount: 0,
                                                    amount:
                                                      (item?.price || 0) *
                                                      quantity,
                                                  }
                                                : item
                                            ),
                                          ]);
                                        } else if (
                                          Number(e.target.value) < price
                                        ) {
                                          setSelectedCourses([
                                            ...selectedCourses.map((item) =>
                                              item._id === _id
                                                ? {
                                                    ...item,
                                                    discount: Number(
                                                      e.target.value
                                                    ),
                                                    amount:
                                                      (item?.price || 0) *
                                                        quantity -
                                                      Number(e.target.value),
                                                  }
                                                : item
                                            ),
                                          ]);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>{amount?.toFixed(2)}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      style={{ height: 40, width: 40 }}
                                      onClick={() => {
                                        const cleanCourses =
                                          selectedCourses.filter(
                                            (ord: OrderDetail) =>
                                              ord?._id !== _id
                                          );
                                        const cleanCourseIds =
                                          selectedCoursesIds.filter(
                                            (id: string) => id !== _id
                                          );
                                        setSelectedCourses([...cleanCourses]);
                                        setSelectedCoursesIds([
                                          ...cleanCourseIds,
                                        ]);
                                      }}
                                    >
                                      <CIcon icon={cilTrash} color="#fffff" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        : null}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 form-group">
                  <div className="d-block col-12 col-sm-5 d-sm-flex col-md-4 col-xl-3 ms-auto mb-1">
                    <CBadge className="form-control me-1" color="warning">
                      Subtotal
                    </CBadge>
                    <CBadge
                      className="form-control me-1"
                      color="default"
                      textColor="black"
                    >
                      {subtotal?.toFixed(2)}
                    </CBadge>
                  </div>
                  <div className="d-block col-12 col-sm-5 d-sm-flex col-md-4 col-xl-3 ms-auto mb-1">
                    <CBadge className="form-control me-1" color="warning">
                      {`IGV ${config?.tax ? `${config?.tax * 100}%` : ""}`}
                    </CBadge>
                    <CBadge
                      className="form-control me-1"
                      color="default"
                      textColor="black"
                    >
                      {config?.tax
                        ? (subtotal * config?.tax)?.toFixed(2)
                        : (0.0).toFixed(2)}
                    </CBadge>
                  </div>
                  <div className="d-block col-12 col-sm-5 d-sm-flex col-md-4 col-xl-3 ms-auto mb-1">
                    <CBadge className="form-control me-1" color="warning">
                      Total
                    </CBadge>
                    <CBadge
                      className="form-control me-1"
                      color="dark"
                      textColor="white"
                    >
                      {config?.tax
                        ? (subtotal + subtotal * config?.tax)?.toFixed(2)
                        : (0.0).toFixed(2)}
                    </CBadge>
                  </div>
                </div>
                <div className="col-12" />
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <SubmitButton
                    disabled={
                      (selectedClient?.documentType?.name === "RUC"
                        ? false
                        : !documentType) ||
                      !center ||
                      !selectedClient ||
                      status === Status.Updating ||
                      selectedCourses.length === 0
                    }
                  >
                    {status === Status.Updating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        &nbsp;Cargando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </SubmitButton>
                </div>
                <div className="form-group col-sm-6 col-xl-3 mt-3">
                  <Link
                    to="/pedidos"
                    className="btn btn-secondary text-white w-100"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
              <br />
            </div>
            <CModal
              visible={visibleClientModal}
              onClose={() => {
                setVisibleClientModal(false);
              }}
            >
              <CModalHeader closeButton={true}>
                <CModalTitle>Selecciona un Cliente</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearchClients}
                  className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
                />
                <div className="w-100 overflow-auto" style={{ height: 300 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 20 }}></th>
                        <th>Cliente</th>
                        <th>Identificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients?.length > 0
                        ? clients.map((cli: Client, index) => {
                            const {
                              _id,
                              name = "",
                              lastname = "",
                              secondLastname = "",
                              documentType: clientDocType,
                              documentNumber: clientDocNumber,
                            } = cli;
                            return (
                              <tr key={_id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input form-check-success p-2"
                                    onClick={() => {
                                      setSelectedClient({
                                        ...cli,
                                      });
                                      setShowClientError(false);
                                      setVisibleClientModal(false);
                                    }}
                                    checked={selectedClient?._id === _id}
                                  />
                                </td>
                                <td>
                                  {name} {lastname} {secondLastname}
                                </td>
                                <td>
                                  {clientDocType?.name
                                    ? clientDocType?.name
                                    : ""}
                                  {clientDocNumber
                                    ? ` - ${clientDocNumber}`
                                    : ""}
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  className="text-white"
                  onClick={() => {
                    setSelectedClient(null);
                    setShowClientError(true);
                    setVisibleClientModal(false);
                  }}
                >
                  Limpiar
                </CButton>
                <CButton
                  color="dark"
                  onClick={() => {
                    if (!selectedClient) {
                      setShowClientError(true);
                    }
                    setVisibleClientModal(false);
                  }}
                >
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>

            <CModal
              visible={visibleCoursesModal}
              onClose={() => {
                setVisibleCoursesModal(false);
              }}
            >
              <CModalHeader closeButton={true}>
                <CModalTitle>Seleccione el/los curso(s)</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <SearchButton
                  validators={validators}
                  handleSearch={handleSearchCourses}
                  className="align-items-end my-1 col-12 flex-md-row d-sm-flex"
                />
                <div className="w-100 overflow-auto" style={{ height: 300 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: 20 }}></th>
                        <th>Curso</th>
                        <th>Precio</th>
                        <th>Nro. Vacantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses?.length > 0
                        ? courses.map((cou: Course, index) => {
                            const {
                              _id,
                              name = "",
                              vacanciesNumber = 0,
                              price = 0,
                            } = cou;
                            return (
                              <tr key={_id}>
                                <td>
                                  {vacanciesNumber ? (
                                    <input
                                      type="checkbox"
                                      name="course"
                                      checked={selectedCoursesIds.includes(
                                        _id || ""
                                      )}
                                      className="form-check-input form-check-success p-2"
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          const cleanCourses =
                                            selectedCourses.filter(
                                              (ord: OrderDetail) =>
                                                ord?._id !== _id
                                            );
                                          const cleanCourseIds =
                                            selectedCoursesIds.filter(
                                              (id: string) => id !== _id
                                            );
                                          setSelectedCourses([
                                            ...cleanCourses,
                                            {
                                              _id: _id,
                                              price: price,
                                              name: name,
                                              quantity: 1,
                                              discount: 0,
                                              course: cou,
                                              amount: Number(price),
                                            },
                                          ]);
                                          setSelectedCoursesIds([
                                            ...cleanCourseIds,
                                            _id || "",
                                          ]);
                                        } else {
                                          const cleanCourses =
                                            selectedCourses.filter(
                                              (ord: OrderDetail) =>
                                                ord?._id !== _id
                                            );
                                          const cleanCourseIds =
                                            selectedCoursesIds.filter(
                                              (id: string) => id !== _id
                                            );
                                          setSelectedCourses([...cleanCourses]);
                                          setSelectedCoursesIds([
                                            ...cleanCourseIds,
                                          ]);
                                        }
                                      }}
                                    />
                                  ) : null}
                                </td>
                                <td>{name || ""}</td>
                                <td>{price.toFixed(2) || "gratis"}</td>
                                <td>{vacanciesNumber || ""}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="dark"
                  className="text-white"
                  onClick={() => {
                    setVisibleCoursesModal(false);
                  }}
                >
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderComponent;
