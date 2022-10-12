import { createButtonClass } from "./util";

export interface ButtonI {
  children: React.ReactNode;
  variant?: "text" | "contained" | "outlined" | "ghost";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  margin?: "left" | "right" | "none" | boolean;
  align?: "left" | "center" | "right";
  circular?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  callbackFn?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  margin = false,
  align = "left",
  circular = true,
  iconOnly = false,
  fullWidth = false,
  callbackFn,
  disabled = false,
  type = "button",
}: ButtonI) {
  const props = {
    children,
    variant,
    size,
    color,
    margin,
    align,
    circular,
    iconOnly,
    fullWidth,
  };

  const classes = createButtonClass(props);

  return (
    <button
      type={type}
      onClick={callbackFn}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
