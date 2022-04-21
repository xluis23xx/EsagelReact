import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";

import { Employee } from "../../../hooks/useEmployees";

type EmployeeItemProps = Employee & {
  fullName: string;
  orderNumber: number;
  code: string;
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
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{fullName}</td>
      <td>{documentType.name}</td>
      <td>{documentNumber}</td>
      <td>{corporateEmail}</td>
      <td>{personalEmail}</td>
      <td>{phoneNumber}</td>
      <td>{birthdate}</td>
      <td>{status}</td>
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
              onClick={() => console.log("algo2")}
            >
              <CIcon icon={cilTrash} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
