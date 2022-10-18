import { useMemo } from "react";
import { usePagination, useTable } from "react-table";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import Button from "@/Atoms/Button";

import { getDataHeaders } from "utils/utils";

import styles from "./styles.module.scss";
import Pagination from "../Pagination";

interface TableI {
  data: any;
  options: {
    myPageOptions: number[];
  };
}

function Table({ data, options }: TableI) {
  const columns = useMemo(() => getDataHeaders(data), [data]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    usePagination
  );
  if (!options) {
    options = {
      myPageOptions: [10, 20, 30, 40, 50],
    };
  }
  let { myPageOptions } = options;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

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
          {page.map((row, i) => {
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
      <Pagination tableInstance={tableInstance} options={options} />
    </div>
  );
}

export default Table;
