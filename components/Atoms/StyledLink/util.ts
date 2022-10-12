import { ButtonI } from "@/Atoms/Button";

import styles from "./styles.module.scss";

const createButtonClass = (props: ButtonI) => {
  const { variant, size, color, margin, circular, iconOnly, fullWidth, align } =
    props;

  let classes = `${styles["button"]} ${styles[`button--${variant}`]} ${
    styles[`button--${size}`]
  } ${styles[`button--${color}`]}`;

  if (margin) {
    classes += ` ${styles[`button--margin-${margin}`]}`;
  }

  if (align) {
    classes += ` ${styles[`button--align-${align}`]}`;
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
