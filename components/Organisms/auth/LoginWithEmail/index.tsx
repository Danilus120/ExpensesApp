import { useState } from "react";
import router from "next/router";
import Form from "@/Molecules/Form";
import Input from "@/Atoms/Input";
import Button from "@/Atoms/Button";
import { loginFormSchema } from "@/constants/validationSchema";
import { auth } from "config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/context/auth/AuthContext";

export default function LoginWithEmail() {
  const [error, setError] = useState();
  const { isLoading, handleChangeLoading } = useAuth();

  const login = (credentials: { email: string; password: string }) => {
    handleChangeLoading(true);
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((res) => {
        router.push("/dashboard");
      })
      .catch((err) => setError(err.code))
      .finally(() => {
        handleChangeLoading(false);
      });
  };

  return (
    <Form
      onSubmit={(data) => {
        login(data);
      }}
      schema={loginFormSchema}
      options={{ haveButtons: false }}
    >
      <Input
        label="Email Address (demo: demo@test.test)"
        name="email"
        type="email"
      />

      <Input
        label="Password (demo: 12345678!Mm)"
        name="password"
        type="password"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        align="center"
        fullWidth
      >
        <span>Login</span>
      </Button>
    </Form>
  );
}
