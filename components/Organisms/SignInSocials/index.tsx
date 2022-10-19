import { useState } from "react";
import router from "next/router";

import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/Atoms/Button";

import { useAuth } from "@/context/AuthContext";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "config/firebase.config";

import styles from "./styles.module.scss";
import { createUserDoc } from "lib/firebaseMethods";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signUpWithSocials = {
  google: googleProvider,
  github: githubProvider,
};

export default function SignInSocials() {
  const [error, setError] = useState();
  const { handleChangeLoading } = useAuth();

  const signInWithSocials = (social: "google" | "github") => {
    handleChangeLoading(true);
    signInWithPopup(auth, signUpWithSocials[social])
      .then((res) => {
        createUserDoc(res.user.uid);
        router.push("/dashboard");
      })
      .catch((err) => setError(err.code))
      .finally(() => {
        handleChangeLoading(false);
      });
  };

  return (
    <div className={styles["signInSocials"]}>
      <Button
        callbackFn={() => signInWithSocials("google")}
        fullWidth
        variant="outlined"
        color="secondary"
        align="center"
      >
        <BsGoogle />
        <p>Google</p>
      </Button>

      <Button
        callbackFn={() => signInWithSocials("github")}
        fullWidth
        variant="outlined"
        color="secondary"
        align="center"
      >
        <BsGithub />
        <p>Github</p>
      </Button>
    </div>
  );
}
