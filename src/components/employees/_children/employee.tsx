import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";

import { Employee } from "../../../hooks/useEmployees";

type EmployeeItemProps = Employee & {
  fullName: string;
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const EmployeeItem: React.FC<EmployeeItemProps> = ({
  orderNumber,
  code,
  fullName,
  documentType,
  documentNumber,
  corporateEmail,
  personalEmail,
  phoneNumber,
  birthdate,
  status,
  handleRemove,
}) => {
  const convertDate = birthdate ? new Date(birthdate) : "";
  const year = convertDate ? convertDate.getFullYear() : "";
  const month = convertDate ? convertDate.getMonth() + 1 : "";
  const day = convertDate ? convertDate.getDate() : "";
  const fullBirthdate = year && month && day ? `${day}/${month}/${year}` : "";
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{fullName || ""}</td>
      <td>{documentType?.name || ""}</td>
      <td>{documentNumber || ""}</td>
      <td>{corporateEmail || ""}</td>
      <td>{personalEmail || ""}</td>
      <td>{phoneNumber || ""}</td>
      <td>{fullBirthdate || ""}</td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/empleados/edit/${code}`}
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
