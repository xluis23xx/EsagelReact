import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";
// import { setFormatDate } from "../../../utils/formats";

import { ProspectusOrigin } from "../../../hooks/useProspectusOrigin";

type ProspectOriginItemProps = ProspectusOrigin & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const PropesctusOriginItem: React.FC<ProspectOriginItemProps> = ({
  orderNumber,
  code,
  description,
  name,
  handleRemove,
  status,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{name || ""}</td>
      <td>{description || ""}</td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/origenes-prospecto/editar/${code}`}
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
