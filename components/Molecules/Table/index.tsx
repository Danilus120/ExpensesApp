import { useMemo, useState } from "react";
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  usePagination,
  useTable,
} from "react-table";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import Button from "@/Atoms/Button";

import { getDataHeaders } from "utils/utils";

import styles from "./styles.module.scss";
import Pagination from "../Pagination";
import { el } from "date-fns/locale";
import Modal from "../Modal";
import { useData } from "@/context/UserDataContext";

interface TableI {
  data: any;
  columns: {
    Header: string;
    accessor: string;
  }[];
  options?: {
    rowsPerPageArray: Array<number>;
  };
  deleteRecordFn: (id: string) => void;
}

// TODO: Add button with position fixed in right bottom corner to add new expense

function Table({ data, columns, options, deleteRecordFn }: TableI) {
  const memoColumns = useMemo(() => columns, []);

  const tableInstance = useTable(
    {
      columns: memoColumns,
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
      rowsPerPageArray: [10, 20, 30, 40, 50],
    };
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,
  } = tableInstance;

  return (
    <div className={styles["container"]}>
      <table {...getTableProps()} className={styles["table"]}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          deleteRecordFn={deleteRecordFn}
        />
      </table>
      <Pagination tableInstance={tableInstance} options={options} />
    </div>
  );
}

interface TableHeadI {
  headerGroups: HeaderGroup<object>[];
}

function TableHead({ headerGroups }: TableHeadI) {
  return (
    <thead className={styles["thead"]}>
      {headerGroups.map((headerGroup) => {
        const { key: headerGroupRowKey, ...restHeaderProps } =
          headerGroup.getHeaderGroupProps();

        return (
          <tr
            key={headerGroupRowKey}
            {...restHeaderProps}
            className={styles["tr"]}
          >
            {headerGroup.headers.map((column) => {
              const { key: headerGroupColKey, ...restColumnProps } =
                column.getHeaderProps();
              return (
                <th
                  key={headerGroupColKey}
                  {...restColumnProps}
                  className={styles["th"]}
                >
                  {column.render("Header")}
                </th>
              );
            })}
            <th className={styles["th"]}>Action</th>
          </tr>
        );
      })}
    </thead>
  );
}

interface TableBodyI {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  page: Row<object>[];
  prepareRow: (row: Row<object>) => void;
  deleteRecordFn: (id: string) => void;
}

function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
  deleteRecordFn,
}: TableBodyI) {
  const { actions } = useData();
  return (
    <tbody {...getTableBodyProps()} className={styles["tbody"]}>
      {page.map((row, i) => {
        const rowData = row.original as any;
        const { id } = rowData;
        console.log(id);

        prepareRow(row);
        const { key: rowKey, ...restRowProps } = row.getRowProps();
        return (
          <tr key={rowKey} {...restRowProps} className={styles["tr"]}>
            {row.cells.map((cell) => {
              const { key: cellKey, ...restCellProps } = cell.getCellProps();

              return (
                <td key={cellKey} {...restCellProps} className={styles["td"]}>
                  {cell.render("Cell")}
                </td>
              );
            })}
            <td className={styles["td"]}>
              <div className={styles["td__buttons"]}>
                <Button
                  variant="ghost"
                  iconOnly
                  callbackFn={() => {
                    /* editRecord(id) - opening modal with data inside */
                  }}
                >
                  <FiEdit />
                </Button>
                <Button
                  variant="ghost"
                  iconOnly
                  callbackFn={() => deleteRecordFn(id)}
                >
                  <AiFillDelete />
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default Table;
