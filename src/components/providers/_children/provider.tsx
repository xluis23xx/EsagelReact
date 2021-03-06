import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { EditItemButton } from "../../global-components/globalButtons";
import { setFormatDate } from "../../../utils/formats";

import { Provider } from "../../../hooks/useProviders";
import { CTooltip } from "@coreui/react";

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
  documentNumber,
  phoneNumber,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{businessName || ""}</td>
      <td>{documentNumber || ""}</td>
      <td>{contactName || ""}</td>
      <td>{phoneNumber || ""}</td>
      <td>{setFormatDate({ date: createdAt })}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={code} title="Editar" path={"proveedores"} />
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
