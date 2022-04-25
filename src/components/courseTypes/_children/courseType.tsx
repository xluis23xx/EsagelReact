import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { setFormatDate } from "../../../utils/formats";

import { CourseType } from "../../../hooks/useCourseTypes";

type CourseTypeItemProps = CourseType & {
  id: string;
  orderNumber: number;
  handleRemove: (id: string) => void;
};

export const CourseTypeItem: React.FC<CourseTypeItemProps> = ({
  id,
  orderNumber,
  code,
  name,
  description,
  createdAt,
  updatedAt,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{code || ""}</td>
      <td>{name || ""}</td>
      <td>{setFormatDate({ date: createdAt }) || ""}</td>
      <td>{setFormatDate({ date: updatedAt }) || ""}</td>
      <td>
        {(description
          ? description.length > 50
            ? `${description.substring(0, 47)}...`
            : description
          : "") || ""}
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/tipos-curso/editar/${id}`}
            >
              <CIcon icon={cilPencil} />
            </Link>
            &nbsp;
            <button
              type="button"
              className="btn btn-block btn-danger"
              style={{ height: 40, width: 40 }}
              onClick={() => handleRemove(id)}
            >
              <CIcon icon={cilTrash} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
