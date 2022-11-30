import { ButtonProps } from "@/Atoms/Button";

import styles from "./styles.module.scss";

const createButtonClass = (
  props: Omit<ButtonProps, "disabled" | "callbackFn" | "type">
) => {
  const { variant, size, color, margin, circular, iconOnly, fullWidth, align } =
    props;

  let classes = `${styles["button"]} ${styles[`button--${variant}`]} ${
    styles[`button--${size}`]
  } ${styles[`button--${color}`]} ${styles[`button--align-${align}`]}`;

  if (margin) {
    classes += ` ${styles[`button--margin-${margin}`]}`;
  }

  if (circular) {
    classes += ` ${styles[`button--circular`]}`;
  }

  if (iconOnly) {
    classes += ` ${styles[`button--icon`]}`;
  }

  if (fullWidth) {
    classes += ` ${styles[`button--fullWidth`]}`;
  }

  return classes;
};

export { createButtonClass };
