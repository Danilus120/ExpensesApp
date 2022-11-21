import Select from "react-select";
import styles from "./styles.module.scss";

interface AutoSelectProps {
  options: { value: string | number; label: string }[];
}

function AutoSelect(props: AutoSelectProps) {
  return (
    <div className={styles["autoSelect"]}>
      <Select options={props.options} />
    </div>
  );
}

export default AutoSelect;
