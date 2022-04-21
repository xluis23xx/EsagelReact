import React from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilOptions } from "@coreui/icons";

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={9823}
          title="Compras"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: ["May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: [51, 55, 40],
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
                    min: 30,
                    max: 89,
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
          value={9823}
          title="Ventas"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: ["May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: [34, 22, 11],
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
                    min: -9,
                    max: 39,
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
          value={9823}
          title="Monto al Contado"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: "70px" }}
              data={{
                labels: ["May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [34, 12, 40],
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
          value={9823}
          title="Sessions"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: ["February", "March", "April"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [84, 67, 82],
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
