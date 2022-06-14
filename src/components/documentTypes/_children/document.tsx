import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";

import { DocumentType } from "../../../hooks/useDocuments";
import { EditItemButton } from "../../global-components/globalButtons";
import { CTooltip } from "@coreui/react";

type DocumentTypeItemProps = DocumentType & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const DocumentTypeItem: React.FC<DocumentTypeItemProps> = ({
  orderNumber,
  code,
  name,
  operation,
  createdAt,
  updatedAt,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{name || ""}</td>
      <td>{operation || ""}</td>
      <td>{setFormatDate({ date: createdAt }) || ""}</td>
      <td>{setFormatDate({ date: updatedAt }) || ""}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton
              code={code}
              title="Editar"
              path={"tipos-documento"}
            />
            &nbsp;
            <CTooltip content={"Eliminar"}>
              <button
                type="button"
                className="btn   btn-danger"
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
