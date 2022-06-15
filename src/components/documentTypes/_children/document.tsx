import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";

import { DocumentType } from "../../../hooks/useDocuments";
import { EditItemButton } from "../../global-components/globalButtons";
import { CTooltip } from "@coreui/react";

type DocumentTypeItemProps = DocumentType & {
  orderNumber: number;
  handleRemove: (id: string) => void;
};

export const DocumentTypeItem: React.FC<DocumentTypeItemProps> = ({
  orderNumber,
  _id = "",
  name,
  operation,
  code,
  length,
  createdAt,
  updatedAt,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{name || ""}</td>
      <td>{operation || ""}</td>
      <td>{code || ""}</td>
      <td>{length || ""}</td>
      <td>{setFormatDate({ date: createdAt }) || ""}</td>
      <td>{setFormatDate({ date: updatedAt }) || ""}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton
              code={_id}
              title="Editar"
              path={"tipos-documento"}
            />
            &nbsp;
            <CTooltip content={"Eliminar"}>
              <button
                type="button"
                className="btn   btn-danger"
                style={{ height: 40, width: 40 }}
                onClick={() => handleRemove(_id)}
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
