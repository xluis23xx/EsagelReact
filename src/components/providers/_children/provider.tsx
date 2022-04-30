import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { setFormatDate } from "src/utils/formats";

import { Provider } from "../../../hooks/useProviders";

type ProviderItemProps = Provider & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const ProviderItem: React.FC<ProviderItemProps> = ({
  orderNumber,
  code,
  businessName,
  createdAt,
  contactName,
  status,
  documentNumber,
  phoneNumber,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{setFormatDate({ date: createdAt })}</td>
      <td>{businessName || ""}</td>
      <td>{documentNumber || ""}</td>
      <td>{contactName || ""}</td>
      <td>{phoneNumber || ""}</td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/proveedores/editar/${code}`}
            >
              <CIcon icon={cilPencil} />
            </Link>
            &nbsp;
            <button
              type="button"
              className="btn btn-block btn-danger"
              style={{ height: 40, width: 40 }}
              onClick={() => handleRemove(code)}
            >
              <CIcon icon={cilTrash} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
