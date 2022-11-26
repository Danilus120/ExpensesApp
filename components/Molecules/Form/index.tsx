import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/Atoms/Button";
import styles from "./styles.module.scss";

interface FormProps {
  defaultValues?: Record<string, any>;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  onDelete?: (id: string) => void | undefined;
  schema: any;
  handleToggle?: () => void;
  options?: {
    haveClearButton?: boolean;
    haveButtons?: boolean;
    resetAfterSubmit?: boolean;
    deleteRecordButton?: boolean;
  };
}

export default function Form({
  defaultValues = {},
  children,
  onSubmit,
  onDelete,
  schema,
  handleToggle,
  options = {
    haveButtons: true,
    haveClearButton: false,
    resetAfterSubmit: true,
    deleteRecordButton: false,
  },
}: FormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmitFn = (data: any) => {
    onSubmit(data);

    if (options.resetAfterSubmit) {
      reset();
    }
  };

  const handleDeleteFn = () => {
    if (onDelete) onDelete(defaultValues.id);

    handleToggle;
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitFn)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    control,
                    key: child.props.name,
                    setValue,
                  },
                })
              : child;
          })
        : children}
      {options?.haveButtons && (
        <div className={styles["button-wrapper"]}>
          <Button variant="contained" color="error" callbackFn={handleToggle}>
            Close
          </Button>

          {options.deleteRecordButton && onDelete ? (
            <Button
              variant="contained"
              color="danger"
              callbackFn={handleDeleteFn}
            >
              Delete Record
            </Button>
          ) : null}

          {options?.haveClearButton && (
            <Button
              variant="contained"
              color="warning"
              callbackFn={() => reset()}
            >
              Clear
            </Button>
          )}

          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}
