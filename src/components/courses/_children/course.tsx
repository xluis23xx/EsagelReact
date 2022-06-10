import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { EditItemButton } from "../../global-components/globalButtons";

import { Course } from "../../../hooks/useCourses";

type CourseItemProps = Course & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const CourseItem: React.FC<CourseItemProps> = ({
  orderNumber,
  _id = "",
  code,
  name,
  price,
  courseType,
  modality,
  vacanciesNumber,
  handleRemove,
  status,
}) => {
  let modalityText = "";
  if (modality) {
    if (modality.length > 0) {
      for (let i = 0; i < modality.length; i++) {
        if (i === 0) {
          modalityText = modality[i];
        } else {
          modalityText = `${modalityText} - ${modality[i]}`;
        }
      }
    }
  }
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{code || ""}</td>
      <td>{name || ""}</td>
      <td>{courseType?.name || ""}</td>
      <td>{modalityText}</td>
      <td>{price || ""}</td>
      <td>{vacanciesNumber || ""}</td>
      <td>{status ? "Activo" : "Inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={_id} path={"cursos"} />
            &nbsp;
            <button
              type="button"
              className="btn   btn-danger"
              style={{ height: 40, width: 40 }}
              onClick={() => handleRemove(_id)}
            >
              <CIcon icon={cilTrash} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
