import React from "react";

import {
  // CButton,
  CCol,
  CRow,
} from "@coreui/react";
import { CChartLine, CChartDoughnut } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
// import CIcon from "@coreui/icons-react";
// import { cilCloudDownload } from "@coreui/icons";

import WidgetsDropdown from "../widgets/WidgetsDropdown";

const Dashboard = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const month = new Date().getMonth();
  const firstMonth = months[month];

  const secondMonth = !months[month - 1]
    ? months[months.length - 1]
    : months[month - 1];
  const thirthMonth = !months[month - 2]
    ? months[months.length - 2]
    : months[month - 2];

  return (
    <>
      <WidgetsDropdown />
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">Ventas - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={8}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirthMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                <CCol sm={4} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [thirthMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Ingresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [1000, 200, 650],
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
        <div className="col-6">
          <div className="card">
            <div className="card-header">Compras - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={8}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirthMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                <CCol sm={4} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [thirthMonth, secondMonth, firstMonth],
                  datasets: [
                    {
                      label: "Egresos",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [400, 500, 100],
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
        <div className="col-6">
          <div className="card">
            <div className="card-header">Ventas - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={8}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Ganado por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirthMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                <CCol sm={4} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
                </CCol>
              </CRow>

              <CChartDoughnut
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [thirthMonth, secondMonth, firstMonth],
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
                      data: [400, 500, 100],
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
        <div className="col-6">
          <div className="card">
            <div className="card-header">Compras - últimos 3 meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={8}>
                  <h4 id="traffic" className="card-title mb-0">
                    Monto Perdido por mes
                  </h4>
                  <div className="medium text-medium-emphasis">
                    {thirthMonth} - {firstMonth} {new Date().getFullYear()}
                  </div>
                </CCol>
                <CCol sm={4} className="d-none d-md-block">
                  {/* <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}
                </CCol>
              </CRow>

              <CChartDoughnut
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: [thirthMonth, secondMonth, firstMonth],
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
                      data: [400, 800, 10],
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
    </>
  );
};

export default Dashboard;
