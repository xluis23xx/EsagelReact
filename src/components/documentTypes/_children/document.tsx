import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";

import { DocumentType } from "../../../hooks/useDocuments";
import { EditItemButton } from "../../global-components/globalButtons";

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
  //   status
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
            <EditItemButton code={code} path={"tipos-documento"} />
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
