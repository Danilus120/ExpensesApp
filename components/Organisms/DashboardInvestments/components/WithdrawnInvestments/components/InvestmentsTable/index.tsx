import { useMemo } from "react";
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  usePagination,
  useTable,
} from "react-table";

import { FiEdit, FiPlus } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";

import Button from "@/Atoms/Button";

import styles from "./styles.module.scss";
import Pagination from "@/Molecules/Pagination";
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
  rollbackRecordFn: (id: string) => void;
  editRecordFn: (id: string) => void;
}

function InvestmentsTable({
  data,
  columns,
  options,
  rollbackRecordFn,
  editRecordFn,
}: TableI) {
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

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    tableInstance;

  return (
    <div className={styles["container"]}>
      <div className={styles["table__wrapper"]}>
        <table {...getTableProps()} className={styles["table"]}>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            editRecordFn={editRecordFn}
            rollbackRecordFn={rollbackRecordFn}
          />
        </table>
      </div>
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
  rollbackRecordFn: (id: string) => void;
  editRecordFn: (id: string) => void;
}

function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
  rollbackRecordFn,
  editRecordFn,
}: TableBodyI) {
  const { userData } = useData();

  return (
    <tbody {...getTableBodyProps()} className={styles["tbody"]}>
      {page.map((row, i) => {
        const rowData = row.original as any;
        const { id } = rowData;

        let trClassNames = `${styles["tr"]}`;

        if (row.values.payoutValue - row.values.value > 0) {
          trClassNames += ` ${styles["bg--green"]}`;
        } else if (row.values.payoutValue - row.values.value < 0) {
          trClassNames += ` ${styles["bg--red"]}`;
        }

        prepareRow(row);
        const { key: rowKey, ...restRowProps } = row.getRowProps();
        return (
          <tr key={rowKey} {...restRowProps} className={trClassNames}>
            {row.cells.map((cell) => {
              const { key: cellKey, ...restCellProps } = cell.getCellProps();

              return (
                <td key={cellKey} {...restCellProps} className={styles["td"]}>
                  {cell.render("Cell")}{" "}
                  {cell.column.Header === "Value" ||
                  cell.column.Header === "Payout Value"
                    ? userData.default_Currency
                    : null}
                </td>
              );
            })}
            <td className={styles["td"]}>
              <div className={styles["td__buttons"]}>
                <Button
                  variant="ghost"
                  iconOnly
                  callbackFn={() => editRecordFn(id)}
                  size="small"
                >
                  <FiEdit />
                </Button>
                <Button
                  variant="ghost"
                  iconOnly
                  callbackFn={() => rollbackRecordFn(id)}
                  size="small"
                >
                  <TbArrowBackUp />
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default InvestmentsTable;
