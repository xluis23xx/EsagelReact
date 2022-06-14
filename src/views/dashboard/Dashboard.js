import React from "react";

import {
  CBadge,
  CButton,
  // CButton,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine, CChartDoughnut } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { cilCloudDownload } from "@coreui/icons/js/free";
// import CIcon from "@coreui/icons-react";
// import { cilCloudDownload } from "@coreui/icons";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useDashboard } from "../../hooks/useDashboard";
import { generateArrayDates } from "../../utils/formats";
import { savePathname } from "../../utils/location";
import { months } from "../../utils/constants";

const Dashboard = () => {
  const { obtainDashboard, dashboardInfo } = useDashboard();
  const [firstMonth, setFirstMonth] = React.useState("dfdfd");
  const [secondMonth, setSecondMonth] = React.useState("fdfdfd");
  const [thirdMonth, setThirdMonth] = React.useState("2303");
  const [selectedQuery, setSelectedQuery] = React.useState(3);
  const [dateParams, setdateParams] = React.useState([]);

  React.useEffect(() => {
    savePathname();

    const generatorDefault = generateArrayDates(3);
    setdateParams(generatorDefault);
    obtainDashboard({
      firstMonth: generatorDefault[0],
      secondMonth: generatorDefault[1],
      thirdMonth: generatorDefault[2],
    });
  }, []);

  React.useEffect(() => {
    const ESAGEL_DB_QUERY = localStorage.getItem("esagel_db_query");
    let dates = [];
    if (ESAGEL_DB_QUERY) {
      setSelectedQuery(ESAGEL_DB_QUERY);
      dates = generateArrayDates(Number(ESAGEL_DB_QUERY));
    } else {
      dates = generateArrayDates(3);
    }
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
        ) || 1
      ]
    }
    ${dateParams[dateParams.length - 1]?.startDate?.substring(0, 4)} - ${
      months[new Date().getMonth()]
    } ${new Date().getFullYear()}`;
  };

  const changeFilterQuery = (e) => {
    if (e.target.value === selectedQuery) {
      return;
    } else {
      setSelectedQuery(e.target.value);
      localStorage.setItem("esagel_db_query", e.target.value);
      console.log(generateArrayDates(e.target.value));
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
                  labels: [thirdMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Ingresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [
                        dashboardInfo?.sales?.totalThirdMonth,
                        dashboardInfo?.sales?.totalSecondMonth,
                        dashboardInfo?.sales?.totalFirstMonth,
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
                  labels: [thirdMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Egresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: "#e55353", // getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [
                        dashboardInfo?.purchases?.totalThirdMonth,
                        dashboardInfo?.purchases?.totalSecondMonth,
                        dashboardInfo?.purchases?.totalFirstMonth,
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
                  labels: [thirdMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                      ],
                      data: [
                        dashboardInfo?.sales?.totalThirdMonth,
                        dashboardInfo?.sales?.totalSecondMonth,
                        dashboardInfo?.sales?.totalFirstMonth,
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
                  labels: [thirdMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Egresos",
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                      ],
                      data: [
                        dashboardInfo?.purchases?.totalThirdMonth,
                        dashboardInfo?.purchases?.totalSecondMonth,
                        dashboardInfo?.purchases?.totalFirstMonth,
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
