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
import { months } from "../../utils/constants";
import { obtainFirstAndLastDayOfMonth } from "../../utils/formats";
import { savePathname } from "../../utils/location";

const Dashboard = () => {
  const { obtainDashboard, dashboardInfo } = useDashboard();
  const [firstMonth, setFirstMonth] = React.useState("");
  const [secondMonth, setSecondMonth] = React.useState("");
  const [thirdMonth, setThirdMonth] = React.useState("");

  React.useEffect(() => {
    savePathname();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const objectFirstMonth = {
      year: currentYear,
      month: months[currentMonth],
    };
    const objectSecondMonth = {
      year: !months[currentMonth - 1] ? currentYear - 1 : currentYear,
      month: !months[currentMonth - 1]
        ? months[months.length - 1]
        : months[currentMonth - 1],
    };
    const objectThirdMonth = {
      year: !months[currentMonth - 2] ? currentYear - 2 : currentYear,
      month: !months[currentMonth - 2]
        ? months[months.length - 2]
        : months[currentMonth - 2],
    };
    setFirstMonth(objectFirstMonth.month);
    setSecondMonth(objectSecondMonth.month);
    setThirdMonth(objectThirdMonth.month);
    const firstMonthParams = obtainFirstAndLastDayOfMonth(objectFirstMonth);
    const secondMonthParams = obtainFirstAndLastDayOfMonth(objectSecondMonth);
    const thirdMonthParams = obtainFirstAndLastDayOfMonth(objectThirdMonth);

    obtainDashboard({
      firstMonth: {
        startDate: `${firstMonthParams.firstDay}T00:00:00.0+00:00`,
        endDate: `${firstMonthParams.endDay}T23:59:59.999+00:00`,
      },
      secondMonth: {
        startDate: `${secondMonthParams.firstDay}T00:00:00.0+00:00`,
        endDate: `${secondMonthParams.endDay}T23:59:59.999+00:00`,
      },
      thirdMonth: {
        startDate: `${thirdMonthParams.firstDay}T00:00:00.0+00:00`,
        endDate: `${thirdMonthParams.endDay}T23:59:59.999+00:00`,
      },
    });
  }, []);

  return (
    <div className="p-relative">
      {/* <button
        style={{
          position: "absolute",
          left: 10,
          right: 30,
          top: 5,
          width: "40px",
        }}
      >
        DESCARGAR */}
      {/* </button> */}
      <CButton color="dark" className="my-3 ms-auto d-block">
        Reporte Ventas vs Compras&nbsp;
        {/* <CBadge color="dark"> */}
        <CIcon icon={cilCloudDownload}></CIcon>
        {/* </CBadge> */}
      </CButton>
      <WidgetsDropdown />
      <div className="row">
        <div className="col-12 col-sm-6 my-2">
          <div className="card">
            <div className="card-header">Ventas - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirdMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                {/* <CCol sm={4} className="d-none d-md-block">
                   <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </CCol> */}
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
            <div className="card-header">Compras - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirdMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                {/* <CCol sm={4} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> 
                </CCol> */}
              </CRow>

              <CChartLine
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [thirdMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Egresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
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
            <div className="card-header">Ventas - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirdMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                {/* <CCol sm={4} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </CCol> */}
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
            <div className="card-header">Compras - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirdMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                {/* <CCol sm={4} className="d-none d-md-block">
                   <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </CCol> */}
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
