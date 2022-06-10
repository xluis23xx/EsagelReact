import { cilEyedropper, cilPaperclip, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";
import { Sale } from "../../../hooks/useSales";
import { EditItemButton } from "../../global-components/globalButtons";
import { CBadge } from "@coreui/react";

type SaleItemProps = Sale & {
  index?: number;
  code?: string;
  handleCancel: (id: string) => void;
  handlePrint: (id: string) => void;
};

export const SaleItem: React.FC<SaleItemProps> = ({
  index,
  code,
  saleNumber,
  client,
  seller,
  createdAt,
  subtotal,
  total,
  status,
  handleCancel,
  handlePrint,
}) => {
  let verifyStatus = "";
  switch (status) {
    case 0:
      verifyStatus = "Anulado";
      break;
    case 1:
    case 2:
      verifyStatus = "Confirmado";
      break;
    default:
      verifyStatus = "Desconocido";
      break;
  }
  let sellerOfSale = "";
  if (seller) {
    if (seller?.employee) {
      const { name, lastname } = seller?.employee || {};
      sellerOfSale = `${name ? name : ""}${lastname ? ` ${lastname}` : ""}`;
    }
  }

  return (
    <tr>
      <td>{index}</td>
      <td>{saleNumber || ""}</td>
      <td>{setFormatDate({ order: 0, date: createdAt })}</td>
      <td>
        {client
          ? `${client?.name ? client?.name : ""}${
              client?.lastname ? ` ${client?.lastname}` : ""
            }`
          : ""}
      </td>
      <td>{sellerOfSale}</td>
      {/*<td>{subtotal ? subtotal.toFixed(2) : ""}</td>*/}
      <td>{total ? total.toFixed(2) : ""}</td>
      <td>
        <CBadge color={status === 0 ? "danger" : status === 1 ? "success" : ""}>
          {verifyStatus}
        </CBadge>
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton
              code={code}
              className="btn btn-success"
              subsection={"detalle"}
              path={"ventas"}
              icon={cilEyedropper}
            />
            &nbsp;
            <button
              type="button"
              className="btn btn-info"
              style={{ height: 40, width: 40 }}
              onClick={() => handlePrint(code)}
            >
              <CIcon icon={cilPaperclip} color="#fffff" />
            </button>
            {status === 1 || status === 2 ? (
              <>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ height: 40, width: 40 }}
                  onClick={() => handleCancel(code)}
                >
                  <CIcon icon={cilTrash} color="#fffff" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </td>
    </tr>
  );
};
