import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";
import { Purchase } from "../../../hooks/usePurchases";
import { EditItemButton } from "../../global-components/globalButtons";
import { CBadge } from "@coreui/react";

type PurchaseItemProps = Purchase & {
  index: number;
  code: string;
  handleCancel: (id: string) => void;
};

export const PurchaseItem: React.FC<PurchaseItemProps> = ({
  index,
  code,
  purchaseNumber,
  name,
  reason,
  provider,
  quantity,
  price,
  createdAt,
  total,
  status,
  handleCancel,
}) => {
  let verifyStatus = "";
  switch (status) {
    case 0:
      verifyStatus = "Anulado";
      break;
    case 1:
      verifyStatus = "Aceptado";
      break;
    default:
      verifyStatus = "Desconocido";
      break;
  }
  return (
    <tr>
      <td>{index}</td>
      <td>{purchaseNumber || ""}</td>
      <td>{name || ""}</td>
      <td>{setFormatDate({ order: 0, date: createdAt })}</td>
      <td>
        {provider
          ? `${provider?.businessName ? provider?.businessName : ""}`
          : ""}
      </td>
      <td>{price ? price?.toFixed(2) : "" || ""}</td>
      <td>{quantity || ""}</td>
      <td>{total ? total?.toFixed(2) : "" || ""}</td>
      <td>
        <CBadge
          color={status === 0 ? "danger" : "" || status === 1 ? "success" : ""}
        >
          {verifyStatus}
        </CBadge>
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton
              code={code}
              subsection={"editar"}
              path={"compras"}
            />
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
          </div>
        </div>
      </td>
    </tr>
  );
};
