import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { setFormatCharacters } from "../../../utils/formats";
import { Topic } from "../../../hooks/useTopics";

type TopicItemProps = Topic & {
  orderNumber: number;
  code: string;
  handleRemove: (id: string) => void;
};

export const TopicItem: React.FC<TopicItemProps> = ({
  orderNumber,
  code,
  status,
  name,
  description,
  handleRemove,
}) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{name || ""}</td>
      <td>
        {setFormatCharacters({ character: description, slice: 50 }) || ""}
      </td>
      <td>{status ? "activo" : "inactivo"}</td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <Link
              type="button"
              className="btn btn-primary"
              style={{ height: 40, width: 40 }}
              to={`/temas/editar/${code}`}
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
