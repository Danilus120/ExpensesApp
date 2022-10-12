import { useState } from "react";

import router from "next/router";

import Input from "@/Atoms/Input";
import Button from "@/Atoms/Button";

import { useAuth } from "@/context/AuthContext";
import { auth } from "config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "./styles.module.scss";

export default function LoginWithEmail() {
  const [error, setError] = useState();
  const { isLoading, handleChangeLoading } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = (credentials: { email: string; password: string }) => {
    handleChangeLoading(true);
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => setError(err.code))
      .finally(() => {
        handleChangeLoading(false);
      });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // TODO: notificationContext with errors from form
  return (
    <form
      action=""
      className={styles["form"]}
      onSubmit={(e) => {
        e.preventDefault();
        login(credentials);
      }}
    >
      <Input
        options={{
          title: "Email Address",
          id: "email",
          value: credentials["email"],
        }}
        handleChange={handleChange}
      />

      <Input
        options={{
          title: "Password",
          type: "password",
          id: "password",
          value: credentials["password"],
        }}
        handleChange={handleChange}
      />

      <Button variant="contained" disabled={isLoading} align="center" fullWidth>
        <span>Login</span>
      </Button>
    </form>
  );
}
