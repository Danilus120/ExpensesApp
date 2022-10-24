import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/Atoms/Button";

import styles from "./styles.module.scss";

interface FormI {
  defaultValues?: Record<string, any>;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  schema: any;
  handleToggle: () => void;
}

export default function Form({
  defaultValues,
  children,
  onSubmit,
  schema,
  handleToggle,
}: FormI) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFn = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFn)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    control,
                    reset,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
      <div className={styles["button-wrapper"]}>
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>

        {/* TODO: Czy warto resetować formularz gdy nie wszystki inputy są resetowane (np. komponent Select) */}
        <Button variant="contained" color="warning" callbackFn={() => reset()}>
          Clear
        </Button>

        <Button variant="contained" color="error" callbackFn={handleToggle}>
          Close
        </Button>
      </div>
    </form>
  );
}
