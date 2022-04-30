import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CImage } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

import { Employee } from "../../../hooks/useEmployees";
import { setFormatDate } from "../../../utils/formats";

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
  phoneNumber,
  birthdate,
  image,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{fullName || ""}</td>
      <td>{documentType?.name || ""}</td>
      <td>{documentNumber || ""}</td>
      <td>{corporateEmail || ""}</td>
      <td>{phoneNumber || ""}</td>
      <td>{setFormatDate({ date: birthdate }) || ""}</td>
      <td>
        {image ? <CImage src={image} alt={fullName} fluid width={60} /> : ""}
      </td>
      {/* <td>{status ? "activo" : "inactivo"}</td> */}
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/empleados/editar/${code}`}
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
