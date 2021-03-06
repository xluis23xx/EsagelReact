import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatCharacters } from "../../../utils/formats";
import { ProspectusOrigin } from "../../../hooks/useProspectusOrigin";
import { EditItemButton } from "../../global-components/globalButtons";
import { CTooltip } from "@coreui/react";

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
      <td>
        {setFormatCharacters({ character: description || "", slice: 50 }) || ""}
      </td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton
              code={code}
              title="Editar"
              path={"origenes-prospecto"}
            />
            &nbsp;
            <CTooltip content={"Eliminar"}>
              <button
                type="button"
                className="btn btn-danger"
                style={{ height: 40, width: 40 }}
                onClick={() => handleRemove(code)}
              >
                <CIcon icon={cilTrash} color="#fffff" />
              </button>
            </CTooltip>
          </div>
        </div>
      </td>
    </tr>
  );
};
