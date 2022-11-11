import { TableInstance } from "react-table";
import styles from "./styles.module.scss";

interface GlobalFilterProps {
  tableInstance: TableInstance<object>;
}

function GlobalFilter({ tableInstance }: GlobalFilterProps) {
  const { state, setGlobalFilter } = tableInstance;

  return (
    <div className={styles["search"]}>
      <input
        type="text"
        placeholder="Search..."
        value={state.globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFilter;
