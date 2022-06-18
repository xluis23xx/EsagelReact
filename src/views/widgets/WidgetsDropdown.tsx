import React from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { months } from "../../utils/constants";
import { DashboardParams, DashboardResult } from "../../hooks/useDashboard";

type WidgetsDropdownProps = {
  dashboardInfo: DashboardResult | null;
  dateParams: DashboardParams;
};

const WidgetsDropdown = ({
  dashboardInfo = null,
  dateParams = [],
}: WidgetsDropdownProps) => {
  const generateLabels = (datesArray: DashboardParams) => {
    let labelArray: string[] = [];
    datesArray.map((dates) => {
      labelArray.push(
        `${
          months[
            Number(Number(dates?.startDate?.substring(5, 7)) - 1) || 0
          ]?.substring(0, 3) || ""
        }. ${dates?.startDate?.substring(0, 4) || ""}`
      );
    });
    return labelArray;
  };

  const getDataByArray = (dates: DashboardResult | null, attribute: string) => {
    let array: number[] = [];
    if (dates?.data) {
      if (dates.data?.length > 0) {
        dates.data?.map((result) => {
          array.push(Number(result[attribute]));
        });
      } else {
        array.push(0);
      }
    } else {
      array.push(0);
    }
    return array;
  };

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={dashboardInfo?.quantityTotalPurchased || 0}
          title="Nro. Compras"
          chart={
            <CChartLine
              type="line"
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [...generateLabels(dateParams)],
                datasets: [
                  {
                    label: "Acumulado",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: getDataByArray(
                      dashboardInfo,
                      "quantityMonthPurchased"
                    ),
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
          value={dashboardInfo?.totalQuantitySales || 0}
          title="Nro. Ventas"
          chart={
            <CChartLine
              type="line"
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [...generateLabels(dateParams)],
                datasets: [
                  {
                    label: "Acumulado",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: getDataByArray(dashboardInfo, "quantityMonthSold"),
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
          value={dashboardInfo?.totalSoldSale || 0}
          title="Monto de Ventas en S/."
          chart={
            <CChartLine
              type="line"
              className="mt-3"
              style={{ height: "70px" }}
              data={{
                labels: [...generateLabels(dateParams)],
                datasets: [
                  {
                    label: "Monto",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: getDataByArray(dashboardInfo, "totalMonthSold"),
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
          value={dashboardInfo?.totalPurchased || 0}
          title="Monto de Compras en S/."
          chart={
            <CChartBar
              type="line"
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [...generateLabels(dateParams)],
                datasets: [
                  {
                    label: "Monto",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: getDataByArray(dashboardInfo, "totalMonthPurchased"),
                    barPercentage: 1.0,
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
                    min: 0,
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
