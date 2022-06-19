import React from "react";

import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine, CChartDoughnut } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { cilCloudDownload } from "@coreui/icons/js/free";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import {
  DashboardDataResult,
  DashboardParams,
  DashboardResult,
  Status,
  useDashboard,
} from "../../hooks/useDashboard";
import { generateArrayDates } from "../../utils/formats";
import { savePathname } from "../../utils/location";
import { months } from "../../utils/constants";
import { ExportButtons } from "../../components/global-components/exportButtons";

const Dashboard = () => {
  const { obtainDashboard, dashboardInfo, status } = useDashboard();
  const [selectedQuery, setSelectedQuery] = React.useState(3);
  const [dateParams, setdateParams] = React.useState<DashboardParams>([]);
  const [visibleModalReport, setVisibleModalReport] = React.useState(false);

  React.useEffect(() => {
    savePathname();
    const ESAGEL_DB_QUERY = localStorage.getItem("esagel_db_query") || null;
    let dateArray: any[] = [];
    if (ESAGEL_DB_QUERY) {
      setSelectedQuery(Number(ESAGEL_DB_QUERY));
      dateArray = generateArrayDates(Number(ESAGEL_DB_QUERY));
    } else {
      dateArray = generateArrayDates(3);
    }
    setdateParams(dateArray);
    obtainDashboard(dateArray).then((res) => setdateParams(dateArray));
  }, []);

  const generateHeader = (title: string): string => {
    let header = `${dateParams.length <= 1 ? "" : `s ${dateParams.length}`}${
      dateParams.length <= 1 ? " mes" : " meses"
    }`;
    return `${title} - último${header}`;
  };

  const generateSubheader = (): string => {
    return `${
      months[Number(Number(dateParams[0]?.startDate?.substring(5, 7)) - 1) || 0]
    }
    ${dateParams[0]?.startDate?.substring(0, 4)} - ${
      months[new Date().getMonth()]
    } ${new Date().getFullYear()}`;
  };

  const generateLabels = (datesArray: DashboardParams): string[] => {
    const labelArray: string[] = [];
    datesArray?.map((dates: any) => {
      labelArray.push(
        `${
          months[Number(dates?.startDate?.substring(5, 7) - 1) || 0]?.substring(
            0,
            3
          ) || ""
        }. ${dates?.startDate?.substring(0, 4) || ""}`
      );
    });
    return labelArray;
  };

  const paletteColors = [
    // "rgb(255, 99, 132)",
    // "rgb(54, 162, 235)",
    // "rgb(255, 205, 86)",
    // "rgb(54, 162, 36)",
    // "rgb(50, 215, 86)",
    // "rgb(20, 162, 0)",
    // "rgb(170, 35, 50)",
    // "rgb(0, 120, 70)",
    // "rgb(100, 195, 16)",
    // "rgb(83, 162, 0)",
    // "rgb(29, 55, 55)",
    "#ff0400",
    "#9e3b42",
    "#404040",
    "#893101",
    "#6f0009",
    "#8d4004",
    "#b2443a",
    "#ff7673",
    "#e4717a",
    "#fda110",
    "#191919",
    "#ffbba8",
  ];

  const changeFilterQuery = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.value === selectedQuery.toString()) {
      return;
    } else {
      setSelectedQuery(Number(e.target.value));
      localStorage.setItem("esagel_db_query", e.target.value);
      const dateArray = generateArrayDates(Number(e.target.value));
      obtainDashboard(dateArray).then(() => setdateParams(dateArray));
    }
  };

  const getDataByArray = (dates: any, attribute: string) => {
    let array: number[] = [];
    if (dates) {
      if (dates?.length > 0) {
        dates?.map((result: DashboardResult) => {
          array.push(result[attribute]);
        });
      }
    }
    return array;
  };

  const tableReportId = "dashboard-report-id";

  return (
    <div className="p-relative">
      <div className="row">
        <div className="form-group col-12 col-sm-6 d-flex col-xl-4 my-3">
          <label className="form-label my-auto text-white" htmlFor="query">
            Filtrar:&nbsp;&nbsp;
          </label>
          <select
            id="query"
            name="query"
            value={selectedQuery || ""}
            onChange={changeFilterQuery}
            disabled={status === Status.Loading || status === Status.Updating}
            className={`btn border-secondary btn-default w-100`}
            style={{ backgroundColor: "#ffffff" }}
          >
            <option value={1}>Último mes</option>
            <option value={2}>Últimos 2 meses</option>
            <option value={3}>Últimos 3 meses</option>
            <option value={4}>Últimos 4 meses</option>
            <option value={5}>Últimos 5 meses</option>
            <option value={6}>Último semestre</option>
            <option value={7}>Últimos 7 meses</option>
            <option value={8}>Últimos 8 meses</option>
            <option value={9}>Últimos 9 meses</option>
            <option value={10}>Últimos 10 meses</option>
            <option value={11}>Últimos 11 meses</option>
            <option value={12}>Último año</option>
          </select>
        </div>
        <div className="form-group col-12 d-sm-none d-xl-flex col-xl-4" />
        <div className="form-group col-12 col-sm-6 col-xl-4 my-3">
          <CButton
            color="dark"
            className="ms-auto d-block"
            disabled={status === Status.Loading || status === Status.Updating}
            onClick={() => setVisibleModalReport(true)}
          >
            Reporte Ventas vs Compras&nbsp;
            <CIcon icon={cilCloudDownload}></CIcon>
          </CButton>
        </div>
      </div>

      <WidgetsDropdown dashboardInfo={dashboardInfo} dateParams={dateParams} />
      <div className="row">
        <div className="col-12 col-sm-6 my-2">
          <div className="card">
            <div className="card-header">{generateHeader("Ventas")}</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado entre meses
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {generateSubheader()}
                  </div>
                </CCol>
              </CRow>

              <CChartLine
                type="line"
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...(generateLabels(dateParams) || "")],
                  datasets: [
                    {
                      label: "Ingresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: getDataByArray(
                        dashboardInfo?.data,
                        "totalMonthSold"
                      ),
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        // beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        // max: 10000,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 my-2">
          <div className="card">
            <div className="card-header">{generateHeader("Compras")}</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido entre meses
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {generateSubheader()}
                  </div>
                </CCol>
              </CRow>

              <CChartLine
                type="line"
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...(generateLabels(dateParams) || "")],
                  datasets: [
                    {
                      label: "Egresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: "#e55353", // getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: getDataByArray(
                        dashboardInfo?.data,
                        "totalMonthPurchased"
                      ),
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        // beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        // max: 10000,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 my-2 mb-4">
          <div className="card">
            <div className="card-header">{generateHeader("Ventas")}</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado entre meses
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {generateSubheader()}
                  </div>
                </CCol>
              </CRow>

              <CChartDoughnut
                type="doughnut"
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...(generateLabels(dateParams) || "")],
                  datasets: [
                    {
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [...paletteColors],
                      data: getDataByArray(
                        dashboardInfo?.data,
                        "totalMonthSold"
                      ),

                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },

                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 my-2">
          <div className="card">
            <div className="card-header">{generateHeader("Compras")}</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido entre meses
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {generateSubheader()}
                  </div>
                </CCol>
              </CRow>

              <CChartDoughnut
                type="doughnut"
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...(generateLabels(dateParams) || "")],
                  datasets: [
                    {
                      label: "Egresos",
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [...paletteColors],
                      data: getDataByArray(
                        dashboardInfo?.data,
                        "totalMonthPurchased"
                      ),

                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },

                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <CModal
        visible={visibleModalReport}
        color="#6f0009"
        onClose={() => {
          setVisibleModalReport(false);
        }}
        className="w-100"
      >
        <CModalHeader closeButton={true}>
          <CModalTitle>Ventas vs Compras</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="w-100 overflow-auto" style={{ height: 300 }}>
            <table className="table table-striped border-3" id={tableReportId}>
              <thead>
                <tr>
                  <th colSpan={6} className="text-center bg-light">
                    Reporte General de compras vs ventas
                  </th>
                </tr>
                <tr>
                  <th style={{ width: 100 }}>Mes y Año</th>
                  <th style={{ width: 100 }}>Monto Vendido</th>
                  <th style={{ width: 100 }}>Nro. Ventas</th>
                  <th style={{ width: 100 }}>Monto Comprado</th>
                  <th style={{ width: 100 }}>Nro. de Compras</th>
                  <th
                    className="fw-bold bg-dark text-white"
                    style={{ width: 100 }}
                  >
                    Total Neto
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardInfo && dashboardInfo?.data?.length > 0
                  ? dashboardInfo?.data?.map((res: DashboardDataResult) => {
                      const {
                        quantityMonthPurchased = 0,
                        quantityMonthSold = 0,
                        totalMonthPurchased = 0,
                        totalMonthSold = 0,
                        endDate,
                        startDate,
                      } = res || {};
                      return (
                        <tr key={startDate + endDate}>
                          <td>
                            {startDate
                              ? `${months[
                                  Number(startDate.substring(5, 7)) - 1
                                ]?.substring(0, 3)} ${startDate.substring(
                                  0,
                                  4
                                )} `
                              : ""}
                          </td>
                          <td>{totalMonthSold?.toFixed(2) || "0.00"}</td>
                          <td>{quantityMonthSold || "0"}</td>
                          <td>{totalMonthPurchased?.toFixed(2) || "0.00"}</td>
                          <td>{quantityMonthPurchased?.toFixed(2) || "0"}</td>
                          <td className="text-white bg-dark">
                            {(totalMonthSold - totalMonthPurchased).toFixed(
                              2
                            ) || "0.00"}
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {dashboardInfo ? (
                  <tr className="bg-dark">
                    <td className="fw-bold bg-dark text-white">Acumulado</td>
                    <td className="text-white">
                      {dashboardInfo?.totalSoldSale?.toFixed(2) || "0.00"}
                    </td>
                    <td className="text-white">
                      {dashboardInfo?.totalQuantitySales || "0"}
                    </td>
                    <td className="text-white">
                      {dashboardInfo?.totalPurchased?.toFixed(2) || "0.00"}
                    </td>
                    <td className="text-white">
                      {dashboardInfo?.quantityTotalPurchased || "0"}
                    </td>
                    <td className="text-white fw-bold">
                      {(
                        (dashboardInfo?.totalSoldSale || 0) -
                        (dashboardInfo?.totalPurchased || 0)
                      )?.toFixed(2) || "0"}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </CModalBody>
        <CModalFooter>
          <ExportButtons
            tableId={tableReportId}
            documentName="generalReport"
            classButtons="btn btn-success text-white"
            classContainer=""
            showExportCSV={false}
            showExportClipBoard={false}
            showExportPDF={false}
            textExcelButton="Exportar a EXCEL"
          />
          <CButton
            color="dark"
            onClick={() => {
              setVisibleModalReport(false);
            }}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Dashboard;
