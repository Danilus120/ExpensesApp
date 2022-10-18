import { useMemo } from "react";
import { useTable } from "react-table";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import Button from "@/Atoms/Button";

import { getDataHeaders } from "utils/utils";

import styles from "./styles.module.scss";

// TODO: Refactor to v8
function Table({ data }: any) {
  const columns = useMemo(() => getDataHeaders(data), [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className={styles["container"]}>
      <table {...getTableProps()} className={styles["table"]}>
        <thead className={styles["thead"]}>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <tr key={key} {...restHeaderProps} className={styles["tr"]}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumnProps} className={styles["th"]}>
                      {column.render("Header")}
                    </th>
                  );
                })}
                <th className={styles["th"]}>Edit</th>
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className={styles["tbody"]}>
          {rows.map((row, i) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps} className={styles["tr"]}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();

                  return (
                    <td key={key} {...restCellProps} className={styles["td"]}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className={styles["td"]}>
                  <div className={styles["td__buttons"]}>
                    <Button variant="ghost" iconOnly>
                      <FiEdit />
                    </Button>
                    <Button variant="ghost" iconOnly>
                      <AiFillDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
