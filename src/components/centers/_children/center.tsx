import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";

import { EditItemButton } from "../../global-components/globalButtons";
import { CBadge, CTooltip } from "@coreui/react";
import { Center } from "../../../hooks/useCenters";

type CenterItemProps = Center & {
  code: string;
  orderNumber: number;
  handleRemove: (id: string) => void;
};

export const CenterItem: React.FC<CenterItemProps> = ({
  code,
  orderNumber,
  branchName,
  address,
  status,
  createdAt,
  updatedAt,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{branchName || ""}</td>
      <td>{address || ""}</td>
      <td>{setFormatDate({ date: createdAt }) || ""}</td>
      <td>{setFormatDate({ date: updatedAt }) || ""}</td>
      <td>
        <CBadge
          color={status === 0 ? "danger" : "" || status === 1 ? "success" : ""}
        >
          {status ? "Activo" : "Inactivo"}
        </CBadge>
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={code} title="Editar" path={"centros"} />
            {status === 1 ? (
              <>
                &nbsp;
                <CTooltip content={"Deshabilitar"}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ height: 40, width: 40 }}
                    onClick={() => handleRemove(code)}
                  >
                    <CIcon icon={cilTrash} color="#fffff" />
                  </button>
                </CTooltip>
              </>
            ) : null}
          </div>
        </div>
      </td>
    </tr>
  );
};
