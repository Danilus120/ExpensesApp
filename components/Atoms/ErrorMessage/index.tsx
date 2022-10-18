import styles from "./styles.module.scss";

interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return <p className={styles["error-message"]}>{text}</p>;
}
