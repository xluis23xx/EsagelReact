import React from "react";

import { CButton, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine, CChartDoughnut } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { cilCloudDownload } from "@coreui/icons/js/free";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useDashboard } from "../../hooks/useDashboard";
import { generateArrayDates } from "../../utils/formats";
import { savePathname } from "../../utils/location";
import { months } from "../../utils/constants";

const Dashboard = () => {
  const { obtainDashboard, dashboardInfo } = useDashboard();
  const [selectedQuery, setSelectedQuery] = React.useState(3);
  const [dateParams, setdateParams] = React.useState([]);

  React.useEffect(() => {
    savePathname();

    const ESAGEL_DB_QUERY = localStorage.getItem("esagel_db_query");
    let dateArray = [];
    if (ESAGEL_DB_QUERY) {
      setSelectedQuery(ESAGEL_DB_QUERY);
      dateArray = generateArrayDates(Number(ESAGEL_DB_QUERY));
    } else {
      dateArray = generateArrayDates(3);
    }
    setdateParams(dateArray);
    console.log(dateArray);
    obtainDashboard(dateArray)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const generateHeader = (title) => {
    let header = `${dateParams.length <= 1 ? "" : `s ${dateParams.length}`}${
      dateParams.length <= 1 ? " mes" : " meses"
    }`;
    return `${title} - último${header}`;
  };

  const generateSubheader = () => {
    return `${
      months[
        Number(
          dateParams[dateParams.length - 1]?.startDate?.substring(5, 7) - 1
        ) || 0
      ]
    }
    ${dateParams[dateParams.length - 1]?.startDate?.substring(0, 4)} - ${
      months[new Date().getMonth()]
    } ${new Date().getFullYear()}`;
  };

  const generateLabels = (datesArray) => {
    let labelArray = [];
    datesArray?.map((dates) => {
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
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(54, 162, 36)",
    "rgb(50, 215, 86)",
    "rgb(20, 162, 0)",
    "rgb(170, 35, 50)",
    "rgb(0, 120, 70)",
    "rgb(100, 195, 16)",
    "rgb(83, 162, 0)",
    "rgb(29, 55, 55)",
  ];

  const changeFilterQuery = (e) => {
    if (e.target.value === selectedQuery) {
      return;
    } else {
      setSelectedQuery(e.target.value);
      localStorage.setItem("esagel_db_query", e.target.value);
      obtainDashboard(generateArrayDates(e.target.value));
    }
  };

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
            disabled={false}
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
          <CButton color="dark" className="ms-auto d-block">
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
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...generateLabels(dateParams)],
                  datasets: [
                    {
                      label: "Ingresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [
                        ...dashboardInfo?.data?.map(
                          (result) => result?.totalMonthSold || 0
                        ),
                      ],
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
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 10000,
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
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...generateLabels(dateParams)],
                  datasets: [
                    {
                      label: "Egresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: "#e55353", // getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [
                        ...dashboardInfo?.data?.map(
                          (result) => result?.totalMonthPurchased || 0
                        ),
                      ],
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
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 10000,
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
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...generateLabels(dateParams)],
                  datasets: [
                    {
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [...paletteColors],
                      data: [
                        ...dashboardInfo?.data?.map(
                          (result) => result?.totalMonthSold || 0
                        ),
                      ],
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
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [...generateLabels(dateParams)],
                  datasets: [
                    {
                      label: "Egresos",
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [...paletteColors],
                      data: [
                        ...dashboardInfo?.data?.map(
                          (result) => result?.totalMonthPurchased || 0
                        ),
                      ],
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
    </div>
  );
};

export default Dashboard;
