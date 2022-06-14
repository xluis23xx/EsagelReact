import React from "react";
import {
  CRow,
  CCol,
  // CDropdown,
  // CDropdownMenu,
  // CDropdownItem,
  // CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { useDashboard } from "../../hooks/useDashboard";
import { months } from "../../utils/constants";
import { obtainFirstAndLastDayOfMonth } from "../../utils/formats";
// import CIcon from "@coreui/icons-react";
// import { cilOptions } from "@coreui/icons";

const WidgetsDropdown = ({ dashboardInfo = null, dateParams = [] }) => {
  const [firstMonth, setFirstMonth] = React.useState("erere");
  const [secondMonth, setSecondMonth] = React.useState("erere");
  const [thirdMonth, setThirdMonth] = React.useState("ererere");

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={dashboardInfo?.purchases?.quantitiesTotal || 0}
          title="Nro. Compras"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [thirdMonth, secondMonth, firstMonth],
                datasets: [
                  {
                    label: "Acumulado",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: [
                      dashboardInfo?.purchases?.quantityThirdMonth || 0,
                      dashboardInfo?.purchases?.quantitySecondMonth || 0,
                      dashboardInfo?.purchases?.quantityFirstMonth || 0,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min:
                      Math.min(
                        dashboardInfo?.purchases?.quantityThirdMonth || 0,
                        dashboardInfo?.purchases?.quantitySecondMonth || 0,
                        dashboardInfo?.purchases?.quantityFirstMonth || 0
                      ) - 2,
                    max:
                      Math.max(
                        dashboardInfo?.purchases?.quantityThirdMonth || 0,
                        dashboardInfo?.purchases?.quantitySecondMonth || 0,
                        dashboardInfo?.purchases?.quantityFirstMonth || 0
                      ) + 2,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={dashboardInfo?.sales?.quantitiesTotal || 0}
          title="Nro. Ventas"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [thirdMonth, secondMonth, firstMonth],
                datasets: [
                  {
                    label: "Acumulado",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: [
                      dashboardInfo?.sales?.quantityThirdMonth || 0,
                      dashboardInfo?.sales?.quantitySecondMonth || 0,
                      dashboardInfo?.sales?.quantityFirstMonth || 0,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min:
                      Math.min(
                        dashboardInfo?.sales?.quantityThirdMonth || 0,
                        dashboardInfo?.sales?.quantitySecondMonth || 0,
                        dashboardInfo?.sales?.quantityFirstMonth || 0
                      ) - 2,
                    max:
                      Math.max(
                        dashboardInfo?.sales?.quantityThirdMonth || 0,
                        dashboardInfo?.sales?.quantitySecondMonth || 0,
                        dashboardInfo?.sales?.quantityFirstMonth || 0
                      ) + 2,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={dashboardInfo?.sales?.amountTotal || 0}
          title="Monto de Ventas en S/."
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: "70px" }}
              data={{
                labels: [thirdMonth, secondMonth, firstMonth],
                datasets: [
                  {
                    label: "Monto",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [
                      dashboardInfo?.sales?.totalThirdMonth || 0,
                      dashboardInfo?.sales?.totalSecondMonth || 0,
                      dashboardInfo?.sales?.totalFirstMonth || 0,
                    ],

                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={dashboardInfo?.purchases?.amountTotal || 0}
          title="Monto de Compras en S/."
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [thirdMonth, secondMonth, firstMonth],
                datasets: [
                  {
                    label: "Monto",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [
                      dashboardInfo?.purchases?.totalThirdMonth || 0,
                      dashboardInfo?.purchases?.totalSecondMonth || 0,
                      dashboardInfo?.purchases?.totalFirstMonth || 0,
                    ],
                    barPercentage: 0.6,
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
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
