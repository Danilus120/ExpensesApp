import React from "react";
import { useConfirmationModalContext } from "@/context/modalConfirmationContext";
import { createButtonClass } from "./util";

type DeleteButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  variant?: "text" | "contained" | "outlined" | "ghost";
  size?: "small" | "medium" | "large";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "danger";
  margin?: "left" | "right" | "none" | boolean;
  align?: "left" | "center" | "right";
  circular?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

const DeleteButton = ({
  children,
  onClick,
  variant = "contained",
  size = "medium",
  color = "primary",
  margin = false,
  align = "left",
  circular = true,
  iconOnly = false,
  fullWidth = false,
  disabled = false,
}: DeleteButtonProps) => {
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

  const modalContext = useConfirmationModalContext();

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const result = await modalContext.showConfirmation(
      "Delete Confirmation!",
      "Are you sure you want to delete this element?"
    );
    result && onClick && onClick(event);
  };

  return (
    <button className={classes} disabled={disabled} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default DeleteButton;
