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

export default function RegisterWithEmail() {
  const [error, setError] = useState();
  const { isLoading, handleChangeLoading, getUser } = useAuth();

  const [credentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
  });

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
        register(credentials);
      }}
    >
      <Input
        options={{
          title: "Nickname",
          id: "displayName",
          value: credentials["displayName"],
        }}
        handleChange={handleChange}
      />

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
        <span>Register</span>
      </Button>
    </form>
  );
}
