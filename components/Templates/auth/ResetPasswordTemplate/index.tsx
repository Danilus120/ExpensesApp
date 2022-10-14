import Head from "next/head";

import ResetPassword from "@/Organisms/ResetPassword";
import StyledLink from "@/Atoms/StyledLink";
import LogoLink from "@/Atoms/LogoLink";

import styles from "../styles.module.scss";

interface ResetPasswordLayoutI {
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function ResetPasswordLayout({
  metaOptions: { title, description },
}: ResetPasswordLayoutI) {
  return (
    <main className={styles["container"]}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles["imgBox"]}>
        <LogoLink />
      </div>

      <div className={styles["login"]}>
        <h1 className={styles["login__title"]}>Forgot your password?</h1>
        <p className={styles["login__description"]}>
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </p>

        <div className={styles["login__content"]}>
          <ResetPassword />
          <StyledLink
            variant="ghost"
            href="/login"
            margin="left"
            align="center"
          >
            <span>Back to Login</span>
          </StyledLink>
        </div>
      </div>
    </main>
  );
}
