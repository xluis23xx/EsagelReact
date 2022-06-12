import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { setFormatDate } from "../../../utils/formats";
import { Goal } from "../../../hooks/useGoals";
import { EditItemButton } from "../../global-components/globalButtons";

type GoalItemProps = Goal & {
  index: number;
  code: string;
  handleCancel: (id: string) => void;
};

export const GoalItem: React.FC<GoalItemProps> = ({
  index,
  code,
  seller = null,
  startDate,
  endDate,
  estimatedQuantity,
  quantitySold,
  handleCancel,
}) => {
  const { employee = null } = seller || {};
  return (
    <tr>
      <td>{index}</td>
      <td>
        {employee
          ? `${employee?.name ? employee?.name : ""}${
              employee?.lastname ? ` ${employee?.lastname}` : ""
            }`
          : ""}
      </td>
      <td>{estimatedQuantity ? estimatedQuantity.toFixed(2) : ""}</td>
      <td>{quantitySold ? quantitySold.toFixed(2) : ""}</td>
      <td>{setFormatDate({ order: 0, date: startDate })}</td>
      <td>{setFormatDate({ order: 0, date: endDate })}</td>
      <td>
        {estimatedQuantity && quantitySold
          ? estimatedQuantity <= quantitySold
            ? "Sí"
            : "No"
          : ""}
      </td>
      <td>
        <div className="selection-btn">
          <div className="btn-group">
            <EditItemButton code={code} subsection={"editar"} path={"metas"} />
            &nbsp;
            <button
              type="button"
              className="btn btn-danger"
              style={{ height: 40, width: 40 }}
              onClick={() => handleCancel(code)}
            >
              <CIcon icon={cilTrash} color="#fffff" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
