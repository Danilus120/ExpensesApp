import { useState } from "react";
import router from "next/router";

import Input from "@/Atoms/Input";
import Button from "@/Atoms/Button";

import { useAuth } from "@/context/AuthContext";
import { auth } from "config/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import styles from "./styles.module.scss";
import { registerFormSchema } from "@/constants/validationSchema";
import Form from "@/Molecules/Form";

export default function RegisterWithEmail() {
  const [error, setError] = useState();
  const { isLoading, handleChangeLoading, getUser } = useAuth();

  const register = async (credentials: {
    displayName: string;
    email: string;
    password: string;
  }) => {
    handleChangeLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .catch((err) => setError(err.code))
        .finally(() => {
          handleChangeLoading(false);
        });

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser).catch((err) =>
          setError(err.code)
        );

        await updateProfile(auth.currentUser, {
          displayName: credentials.displayName,
        }).catch((err) => setError(err.code));
      }

      // TODO - komentarz dlaczego - updateUser()
      getUser();
    } catch (err) {
      console.log(err);
    }

    router.push("/dashboard");
  };

  return (
    <Form
      onSubmit={(data) => {
        register(data);
      }}
      schema={registerFormSchema}
    >
      <Input label="Display name" name="displayName" type="text" />

      <Input label="Email Address" name="email" type="email" />

      <Input label="Password" name="password" type="password" />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        align="center"
        fullWidth
      >
        <span>Register</span>
      </Button>
    </Form>
  );
}
