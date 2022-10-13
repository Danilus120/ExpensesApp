import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormI {
  defaultValues?: Record<string, any>;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  schema: yup.AnyObjectSchema;
}

export default function Form({
  defaultValues,
  children,
  onSubmit,
  schema,
}: FormI) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submitFn = (data: any) => {
    if (Object.keys(errors).length >= 0) {
      console.log(errors);
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
