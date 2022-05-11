import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatCharacters, setFormatDate } from "../../../utils/formats";

import { CourseType } from "../../../hooks/useCourseTypes";
import { EditItemButton } from "../../global-components/globalButtons";

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
        {setFormatCharacters({ character: description, slice: 50 }) || ""}
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={id} path={"tipos-curso"} />
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
