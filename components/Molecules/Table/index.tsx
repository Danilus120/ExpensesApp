import { useMemo } from "react";
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  usePagination,
  useTable,
  useGlobalFilter,
  TableInstance,
} from "react-table";
import { FiEdit, FiPlus } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Pagination from "@/Molecules/Pagination";
import Button from "@/Atoms/Button";
import GlobalFilter from "./components/GlobalFilter";
import styles from "./styles.module.scss";

import ConfirmationModalContextProvider from "@/context/modalConfirmationContext";
import DeleteButton from "@/Atoms/DeleteButton";

interface TableProps {
  data: any;
  columns: {
    Header: string;
    accessor: string;
  }[];
  options?: {
    rowsPerPageArray: Array<number>;
  };
  defaultCurrency: string;
  deleteRecordFn: (id: string) => void;
  editRecordFn: (id: string) => void;
  addFn?: () => void;
  title?: string;
}

function Table({
  data,
  columns,
  options,
  deleteRecordFn,
  editRecordFn,
  defaultCurrency,
  addFn,
  title,
}: TableProps) {
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
    useGlobalFilter,
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
    <ConfirmationModalContextProvider>
      <div className={styles["container"]}>
        <TableHeader
          addFn={addFn}
          title={title}
          tableInstance={tableInstance}
        />
        <div className={styles["table__wrapper"]}>
          <table {...getTableProps()} className={styles["table"]}>
            <TableHead headerGroups={headerGroups} />
            <TableBody
              getTableBodyProps={getTableBodyProps}
              page={page}
              defaultCurrency={defaultCurrency}
              prepareRow={prepareRow}
              editRecordFn={editRecordFn}
              deleteRecordFn={deleteRecordFn}
            />
          </table>
        </div>
        <Pagination tableInstance={tableInstance} options={options} />
      </div>
    </ConfirmationModalContextProvider>
  );
}

interface TableHeaderProps {
  title: string | undefined;
  addFn: (() => void) | undefined;
  tableInstance: TableInstance<object>;
}

function TableHeader({ title, addFn, tableInstance }: TableHeaderProps) {
  return (
    <div className={styles["header"]}>
      <div className={styles["left"]}>
        {title ? <h3>{title} table</h3> : null}
      </div>
      <div className={styles["right"]}>
        <GlobalFilter tableInstance={tableInstance} />
        {addFn ? (
          <div className={styles["button__container"]}>
            <Button
              variant="contained"
              color="success"
              callbackFn={addFn}
              size="medium"
            >
              <FiPlus /> Add {title}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface TableHeadProps {
  headerGroups: HeaderGroup<object>[];
}

function TableHead({ headerGroups }: TableHeadProps) {
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

interface TableBodyPropsI {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  page: Row<object>[];
  defaultCurrency: any;
  prepareRow: (row: Row<object>) => void;
  deleteRecordFn: (id: string) => void;
  editRecordFn: (id: string) => void;
}

function TableBody({
  getTableBodyProps,
  page,
  defaultCurrency,
  prepareRow,
  deleteRecordFn,
  editRecordFn,
}: TableBodyPropsI) {
  return (
    <tbody {...getTableBodyProps()} className={styles["tbody"]}>
      {page.map((row, i) => {
        const rowData = row.original as any;
        const { id } = rowData;

        prepareRow(row);
        const { key: rowKey, ...restRowProps } = row.getRowProps();
        return (
          <tr key={rowKey} {...restRowProps} className={styles["tr"]}>
            {row.cells.map((cell) => {
              const { key: cellKey, ...restCellProps } = cell.getCellProps();

              return (
                <td key={cellKey} {...restCellProps} className={styles["td"]}>
                  {cell.render("Cell")}{" "}
                  {cell.column.Header === "Value" ? defaultCurrency : null}
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
                  id="edit-record-btn"
                >
                  <FiEdit />
                </Button>
                <DeleteButton
                  variant="ghost"
                  size="small"
                  iconOnly
                  onClick={() => deleteRecordFn(id)}
                >
                  <AiFillDelete />
                </DeleteButton>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default Table;
