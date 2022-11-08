import { useState } from "react";
import router from "next/router";

import Form from "@/Molecules/Form";
import Input from "@/Atoms/Input";
import Button from "@/Atoms/Button";

import { useAuth } from "@/context/auth/AuthContext";
import { auth } from "config/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { registerFormSchema } from "@/constants/validationSchema";
import { createUserDoc } from "lib/firebaseMethods";

export default function RegisterWithEmail() {
  const [error, setError] = useState();
  const { isLoading, handleChangeLoading, updateUser } = useAuth();

  const register = async (credentials: {
    displayName: string;
    email: string;
    password: string;
  }) => {
    handleChangeLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await createUserDoc(res.user.uid);

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser).catch((err) =>
          setError(err.code)
        );

        await updateProfile(auth.currentUser, {
          displayName: credentials.displayName,
        }).catch((err) => setError(err.code));
      }

      await router.push("/dashboard");
      handleChangeLoading(false);

      updateUser();
    } catch (err: any) {
      setError(err.code);
    }
  };

  return (
    <Form
      onSubmit={(data) => {
        register(data);
      }}
      schema={registerFormSchema}
      options={{ haveButtons: false }}
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
