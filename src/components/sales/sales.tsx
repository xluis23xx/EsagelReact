/* eslint-disable react-hooks/exhaustive-deps */
import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { SaleItem } from "./_children/sale";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Sale, useSales, Status } from "../../hooks/useSales";
import { ExportButtons } from "../global-components/exportButtons";
import {
  IntervalButton,
  PaginateButtons,
} from "../global-components/globalButtons";
import { formatExceedDate } from "../../utils/errors";
import { savePathname } from "../../utils/location";
import { setFormatDate } from "../../utils/formats";

const SalesComponent = () => {
  const {
    sales,
    cancelSale,
    getAllSales,
    setIntervalFilter,
    changePage,
    paginateData,
    status,
  } = useSales();
  const [visibleAbortModal, setVisibleAbortModal] = React.useState(false);
  const [saleId, setSaleId] = React.useState("");

  React.useEffect(() => {
    savePathname();

    const currentDate = new Date();
    const startDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T00:00:00.0+00:00`;
    const endDate = `${setFormatDate({
      order: 1,
      date: currentDate,
      separator: "-",
    })}T23:59:59.999+00:00`;
    setIntervalFilter({
      startDate: startDate,
      endDate: endDate,
    });
    getAllSales({ startDate, endDate }, { limit: 20, pageSize: 1 });
  }, []);

  const abortSale = (id: string) => {
    setVisibleAbortModal(!visibleAbortModal);
    if (!visibleAbortModal) {
      setSaleId(id);
    } else if (visibleAbortModal && saleId) {
      cancelSale(id);
      setSaleId("");
    }
  };

  const handlePrint = (id: string) => {
    console.log("imprimiendo...", id);
  };

  const validators = {
    required: true,
    validator: formatExceedDate(),
    invalidtext: true,
  };

  const handleSearchByInterval = (data) => {
    let startDate = "";
    let endDate = "";
    if (data?.startDate) {
      startDate = `${data?.startDate.replace("/", "-")}T00:00:00.0+00:00`;
    }
    if (data?.endDate) {
      endDate = `${data?.endDate.replace("/", "-")}T23:59:59.999+00:00`;
    }
    setIntervalFilter({ startDate: startDate, endDate: endDate });
    getAllSales({ startDate, endDate }, { limit: 20, pageSize: 1 });
  };

  const tableExportId = "sales-table";

  const headers = [
    { label: "Nro. Venta", key: "saleNumber" },
    { label: "Fecha de Emisión", key: "createdAt" },
    { label: "Cliente", key: "clientName" },
    { label: "Vendedor", key: "sellerName" },
    { label: "Total", key: "total" },
    { label: "Estado", key: "status" },
  ];

  return (
    <>
      <div className="row mb-3" />
      <div className="row my-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <CIcon icon={cilHamburgerMenu} />
              &nbsp;VENTAS GENERALES
            </div>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 my-2 row">
                <ExportButtons
                  dataReport={sales.map((sale: Sale) => {
                    const { client = null, seller = null } = sale || {};
                    let clientName = "Desconocido";
                    let sellerName = "Desconocido";
                    if (client) {
                      client?.name ? (clientName = client?.name) : "";
                      client?.lastname
                        ? (clientName = `${clientName} ${client?.lastname}`)
                        : "";
                    }

                    if (seller) {
                      const { employee = null } = seller || {};
                      if (employee) {
                        employee?.name ? (sellerName = employee?.name) : "";
                        employee?.lastname
                          ? (sellerName = `${sellerName} ${employee?.lastname}`)
                          : "";
                      }
                    }
                    return {
                      ...sale,
                      clientName: clientName,
                      sellerName: sellerName,
                      total: sale?.total || "",
                    };
                  })}
                  headers={headers}
                  tableId={tableExportId}
                  documentName={"sales"}
                />
                <IntervalButton
                  handleSearch={handleSearchByInterval}
                  validators={validators}
                />
              </nav>
              <br />
              <div className="w-100 overflow-auto" style={{ height: 300 }}>
                {status === Status.Loading ? (
                  <h4 className="text-center">Espere un momento...</h4>
                ) : null}
                {(status === Status.Ready || status === Status.Updating) &&
                sales.length > 0 ? (
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
                      {sales.map((sale: Sale, index: number) => {
                        const {
                          _id,
                          seller = null,
                          client = null,
                          status,
                          createdAt,
                          saleNumber,
                          subtotal,
                          total,
                        } = sale;
                        return (
                          <SaleItem
                            key={index}
                            index={index + 1}
                            code={_id}
                            client={client}
                            seller={seller}
                            status={status}
                            createdAt={createdAt}
                            saleNumber={saleNumber}
                            subtotal={subtotal}
                            total={total}
                            handlePrint={handlePrint}
                            handleCancel={abortSale}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
              {sales.length > 0 ? (
                <div className="w-100 text-center mt-2">
                  <PaginateButtons
                    handleChange={changePage}
                    paginate={paginateData}
                  ></PaginateButtons>
                </div>
              ) : null}
              <CModal
                visible={visibleAbortModal}
                onClose={() => {
                  setSaleId("");
                  setVisibleAbortModal(false);
                }}
              >
                <CModalHeader closeButton={true}>
                  <CModalTitle>Anular Venta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  ¿Estás seguro que quieres anular esta venta?
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    className="text-white"
                    onClick={() => {
                      setSaleId("");
                      setVisibleAbortModal(false);
                    }}
                  >
                    Cerrar
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => abortSale(saleId)}
                  >
                    Anular
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

export default SalesComponent;
