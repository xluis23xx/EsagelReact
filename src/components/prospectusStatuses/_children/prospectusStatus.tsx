import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";

import { setFormatCharacters } from "../../../utils/formats";
import { ProspectusStatus } from "../../../hooks/usePropectusStatus";
import { EditItemButton } from "../../global-components/globalButtons";

type ProspectStatusItemProps = ProspectusStatus & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const PropesctusStatusItem: React.FC<ProspectStatusItemProps> = ({
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
        {setFormatCharacters({ character: description, slice: 50 }) || ""}
      </td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={code} path={"estados-prospecto"} />
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
