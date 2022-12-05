import { useState } from "react";
import router from "next/router";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "@/Atoms/Button";
import { auth } from "config/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createUserDoc } from "lib/firebaseMethods";
import { useAuth } from "@/context/auth/AuthContext";
import styles from "./styles.module.scss";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signUpWithSocials = {
  google: googleProvider,
  github: githubProvider,
};

export default function SignInSocials() {
  const [error, setError] = useState();
  const { user, handleChangeLoading } = useAuth();

  const signInWithSocials = async (social: "google" | "github") => {
    handleChangeLoading(true);
    try {
      const res = await signInWithPopup(auth, signUpWithSocials[social]);
      await createUserDoc(res.user.uid);
      await router.push("/dashboard");
      handleChangeLoading(false);
    } catch (err: any) {
      setError(err.code);
    }

    // try {
    //   if (!user) {
    //     const provider = signUpWithSocials[social];
    //     await signInWithRedirect(auth, provider);
    //   }
    //   handleChangeLoading(false);
    // } catch (err: any) {
    //   setError(err.code);
    // } finally {
    // }
  };

  // if (user) {
  //   router.push("/dashboard");
  // }

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
