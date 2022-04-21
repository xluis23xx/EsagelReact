import React from "react";

import { CButton, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";

import WidgetsDropdown from "../widgets/WidgetsDropdown";

const Dashboard = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <>
      <WidgetsDropdown />
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">Compras - mes</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Tráfico
                  </h4>
                  <div className="small text-medium-emphasis">
                    .... - .... 2022
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: ["May", "June", "July"],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [random(50, 200), random(50, 200), random(50, 200)],
                      fill: true,
                    },
                    {
                      label: "My Second dataset",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-success"),
                      pointHoverBackgroundColor: getStyle("--cui-success"),
                      borderWidth: 2,
                      data: [random(50, 200), random(50, 200), random(50, 200)],
                    },
                    {
                      label: "My Third dataset",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-danger"),
                      pointHoverBackgroundColor: getStyle("--cui-danger"),
                      borderWidth: 1,
                      borderDash: [8, 5],
                      data: [65, 65, 65],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
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
                        max: 250,
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
            <div className="card-header">Ventas - meses</div>
            <div className="card card-body bg-white p-4">
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Tráfico
                  </h4>
                  <div className="small text-medium-emphasis">
                    .... - .... 2022
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: "290px", marginTop: "15px" }}
                data={{
                  labels: ["May", "June", "July"],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      data: [random(50, 200), random(50, 200), random(50, 200)],
                      fill: true,
                    },
                    {
                      label: "My Second dataset",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-success"),
                      pointHoverBackgroundColor: getStyle("--cui-success"),
                      borderWidth: 2,
                      data: [random(50, 200), random(50, 200), random(50, 200)],
                    },
                    {
                      label: "My Third dataset",
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-danger"),
                      pointHoverBackgroundColor: getStyle("--cui-danger"),
                      borderWidth: 1,
                      borderDash: [8, 5],
                      data: [65, 65, 65],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
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
                        max: 250,
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
      </div>
    </>
  );
};

export default Dashboard;
