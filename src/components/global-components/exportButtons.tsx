import * as React from "react";
import { CSVLink } from "react-csv";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { extendedDate } from "../../utils/formats";

type HeaderReport = {
  label: string;
  key: string;
};

interface ExportButtonsProps {
  tableId?: string;
  documentName?: string;
  dataReport?: any;
  headers?: HeaderReport[];
  classContainer?: string;
  classButtons?: string;
  showExportPDF?: boolean;
  showExportExcel?: boolean;
  showExportCSV?: boolean;
  showExportClipBoard?: boolean;
  textPDFButton?: string;
  textCSVButton?: string;
  textExcelButton?: string;
  textClipBoardButton?: string;
}

export const ExportButtons = ({
  tableId,
  documentName,
  dataReport,
  headers,
  classContainer = "col-12 mx-auto mx-ms-0 me-ms-auto col-md-6 text-center text-md-start text-light",
  classButtons = "btn btn-dark mx-2 ms-md-2 my-1",
  showExportExcel = true,
  showExportCSV = true,
  showExportClipBoard = true,
  showExportPDF = true,
  textCSVButton = "CSV",
  textClipBoardButton = "COPIA",
  textExcelButton = "EXCEL",
  textPDFButton = "PDF",
}: ExportButtonsProps) => {
  // TOAST EN CASO DE EXITO O ERROR
  const notifySuccess = (text: string = "Copiado en el portapapeles") => {
    toast.success(text, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const notifyError = (text: string = "Fallo en Copiar en el portapapeles") => {
    toast.error(text, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  // Función para el botón PDF
  const exportPDF = (
    headers: HeaderReport[],
    data: any,
    documentName: string
  ) => {
    const doc = new jsPDF();
    // autoTable(doc, { html: "#my-table" });
    const body: any = [];
    try {
      data.map((d: any) => {
        const arrayValue: any = [];
        headers.map((head) => {
          const key: any = head.key;
          arrayValue.push(d[key]);
        });
        body.push(arrayValue);
      });
      autoTable(doc, {
        head: [[...headers.map((head) => head.label)]],
        body: body,
      });
      doc.save(`${documentName} ${extendedDate()}.pdf`);
    } catch (err) {
      notifyError("Fallo en generar PDF");
    }
  };

  // Función para el botón COPIAR
  const copyToClipBoard = (data: any, headers: HeaderReport[]) => {
    let content = "";
    const auxArray: any = [];
    try {
      data.map((d: any) => {
        let values = "";
        headers.map((head) => {
          if (!values) {
            values = d[head.key];
          } else {
            values = `${values},${d[head.key]}`;
          }
        });
        auxArray.push(values);
      });
      auxArray.map((value: string, index: number) => {
        if (index === 0) {
          content = value;
        } else {
          content = `${content}\n${value}`;
        }
      });
      navigator.clipboard
        .writeText(content)
        .then(() => {
          notifySuccess();
        })
        .catch((err) => {
          notifyError();
        });
    } catch (err) {
      notifyError();
    }
  };

  return (
    <div className={classContainer}>
      {showExportClipBoard && headers && dataReport ? (
        <button
          type="button"
          className={classButtons}
          style={{ minWidth: "70px" }}
          onClick={() => copyToClipBoard(dataReport, headers)}
        >
          {textClipBoardButton}
        </button>
      ) : null}
      {showExportExcel && tableId && documentName ? (
        <ReactHTMLTableToExcel
          id="btn-export-excel"
          className={classButtons}
          table={tableId}
          style={{ minWidth: "70px" }}
          filename={`${documentName} ${extendedDate()}`}
          sheet={`${documentName} ${extendedDate()}`}
          buttonText={textExcelButton}
        ></ReactHTMLTableToExcel>
      ) : null}
      {showExportCSV && headers && dataReport && documentName ? (
        <CSVLink
          headers={headers}
          data={dataReport}
          className={classButtons}
          style={{ minWidth: "70px" }}
          filename={`${documentName} ${extendedDate()}.csv`}
        >
          {textCSVButton}
        </CSVLink>
      ) : null}
      {showExportPDF && headers && dataReport && documentName ? (
        <button
          type="button"
          className={classButtons}
          style={{ minWidth: "70px" }}
          onClick={() => exportPDF(headers, dataReport, documentName)}
        >
          {textPDFButton}
        </button>
      ) : null}
      <ToastContainer />
    </div>
  );
};
