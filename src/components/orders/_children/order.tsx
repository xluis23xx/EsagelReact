import { cilCart, cilEyedropper, cilPaperclip, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";
import { Order } from "../../../hooks/useOrders";
import { EditItemButton } from "../../global-components/globalButtons";
import { CBadge } from "@coreui/react";

type OrderItemProps = Order & {
  index: number;
  code: string;
  handleConfirm: (id: string) => void;
  handleCancel: (id: string) => void;
  handlePrint: (id: string) => void;
};

export const OrderItem: React.FC<OrderItemProps> = ({
  index,
  code,
  orderNumber,
  client,
  createdAt,
  total,
  status,
  handleConfirm,
  handleCancel,
  handlePrint,
}) => {
  let verifyStatus = "";
  switch (status) {
    case 0:
      verifyStatus = "Anulado";
      break;
    case 1:
      verifyStatus = "Pendiente";
      break;
    case 2:
      verifyStatus = "Aceptado";
      break;
    default:
      verifyStatus = "Desconocido";
      break;
  }
  return (
    <tr>
      <td>{index}</td>
      <td>{orderNumber || ""}</td>
      <td>
        {client
          ? `${client?.name ? client?.name : ""}${
              client?.lastname ? ` ${client?.lastname}` : ""
            }`
          : ""}
      </td>
      <td>{setFormatDate({ order: 0, date: createdAt })}</td>
      <td>{total || ""}</td>
      <td>
        <CBadge
          color={
            status === 0
              ? "danger"
              : "" || status === 1
              ? "info"
              : "" || status === 2
              ? "success"
              : ""
          }
        >
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
              path={"pedidos"}
              icon={cilEyedropper}
            />
            {status === 1 ? (
              <>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ height: 40, width: 40 }}
                  onClick={() => handleConfirm(code)}
                >
                  <CIcon icon={cilCart} color="#fffff" />
                </button>
              </>
            ) : null}
            {status === 1 ? (
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
            &nbsp;
            <button
              type="button"
              className="btn btn-info"
              style={{ height: 40, width: 40 }}
              onClick={() => handlePrint(code)}
            >
              <CIcon icon={cilPaperclip} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
