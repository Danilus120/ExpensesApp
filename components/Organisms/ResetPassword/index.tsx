import { useState, ChangeEvent } from "react";

import router from "next/router";

import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "config/firebase.config";

export default function ResetPassword() {
  const [credentials, setCredentials] = useState({
    email: "",
  });

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);

    router.push("/login");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        forgotPassword(credentials.email);
      }}
    >
      <Input
        options={{
          title: "Email Address",
          id: "email",
          value: credentials.email,
        }}
        handleChange={handleChange}
      />

      <Button variant="contained" align="center" fullWidth>
        <span>Reset Password</span>
      </Button>
    </form>
  );
}
