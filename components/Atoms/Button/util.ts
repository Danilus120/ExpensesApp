import { ButtonI } from "@/Atoms/Button";

import styles from "./styles.module.scss";

const createButtonClass = (
  props: Omit<ButtonI, "disabled" | "callbackFn" | "type">
) => {
  const { variant, size, color, margin, circular, iconOnly, fullWidth, align } =
    props;

  let classes = `${styles["button"]} ${styles[`button--${variant}`]} ${
    styles[`button--${size}`]
  } ${styles[`button--${color}`]} ${styles[`button--align-${align}`]}`;

  // switch(true) {
  //   case margin:
  //     classes += ` ${styles[`button--margin-${margin}`]}`;
  //   case circular:
  //     classes += ` ${styles[`button--circular`]}`;
  //   case iconOnly:
  //     classes += ` ${styles[`button--icon`]}`;
  //   case fullWidth:
  //     classes += ` ${styles[`button--fullWidth`]}`;
  // }

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
