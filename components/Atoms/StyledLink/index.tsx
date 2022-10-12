import Link from "next/link";
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
  href: string;
  type?: "button" | "submit";
}

export default function StyledLink({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  margin = false,
  align = "left",
  circular = true,
  iconOnly = false,
  fullWidth = false,
  href,
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
    href,
    disabled,
    type,
  };

  const classes = createButtonClass(props);

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  );
}
