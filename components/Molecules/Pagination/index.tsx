import { TableInstance } from "react-table";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Button from "@/Atoms/Button";
import styles from "./styles.module.scss";

interface TableI {
  tableInstance: TableInstance<object>;
  options: {
    rowsPerPageArray: number[];
  };
}

function Pagination({ tableInstance, options }: TableI) {
  const {
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

  const { rowsPerPageArray } = options;

  const arrayOfPageNumbers = Array.from(Array(pageOptions.length).keys());

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__page-select"]}>
        <div className={styles["label"]}>Page:</div>
        <select
          value={pageIndex}
          onChange={(e) => {
            gotoPage(Number(e.target.value));
          }}
        >
          {arrayOfPageNumbers.map((index: number) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["pagination__rows-per-page"]}>
        <div className={styles["label"]}>Rows per page:</div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {rowsPerPageArray.map((pageSize: number) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["pagination__pageCount"]}>
        {pageIndex + 1} of {pageOptions.length}
      </div>
      <div className={styles["pagination__buttons"]}>
        <Button
          variant="ghost"
          callbackFn={() => gotoPage(0)}
          disabled={!canPreviousPage}
          iconOnly
        >
          <BiFirstPage />
        </Button>
        <Button
          variant="ghost"
          callbackFn={() => previousPage()}
          disabled={!canPreviousPage}
          iconOnly
        >
          <MdNavigateBefore />
        </Button>
        <Button
          variant="ghost"
          callbackFn={() => nextPage()}
          disabled={!canNextPage}
          iconOnly
        >
          <MdNavigateNext />
        </Button>
        <Button
          variant="ghost"
          callbackFn={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          iconOnly
        >
          <BiLastPage />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
