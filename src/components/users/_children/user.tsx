import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CBadge } from "@coreui/react";
import React from "react";
import { User } from "../../../hooks/useUsers";
import { formatRolName } from "../../../utils/formats";
import { EditItemButton } from "../../global-components/globalButtons";

type UserItemProps = User & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const UserItem: React.FC<UserItemProps> = ({
  orderNumber,
  code,
  employee,
  roles,
  username,
  handleRemove,
  status,
}) => {
  let fullname = "";
  if (employee?.name) {
    fullname = `${employee?.name}${
      employee?.lastname ? ` ${employee?.lastname}` : ""
    }${employee?.secondLastname ? ` ${employee?.secondLastname}` : ""}`;
  }
  let rolesText = "";
  if (roles) {
    if (roles.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        if (i === 0) {
          rolesText = formatRolName(roles[i]?.name || "") || "";
        } else {
          rolesText = `${rolesText} - ${formatRolName(roles[i]?.name || "")}`;
        }
      }
    }
  }
  return (
    <tr>
      <td>{orderNumber || ""}</td>
      <td>{username || ""}</td>
      <td>{rolesText}</td>
      <td>{fullname || ""}</td>
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
            <EditItemButton code={code} path={"usuarios"} />
            &nbsp;
            {status === 1 ? (
              <button
                type="button"
                className="btn   btn-danger"
                style={{ height: 40, width: 40 }}
                onClick={() => handleRemove(code)}
              >
                <CIcon icon={cilTrash} color="#fffff" />
              </button>
            ) : null}
          </div>
        </div>
      </td>
    </tr>
  );
};
