import Head from "next/head";
import Link from "next/link";
import LoginWithEmail from "@/Organisms/auth/LoginWithEmail";
import SignInSocials from "@/Organisms/auth/SignInSocials";
import LogoLink from "@/Atoms/LogoLink";
import Separator from "@/Atoms/Separator";
import StyledLink from "@/Atoms/StyledLink";
import styles from "../styles.module.scss";

interface LoginTemplateProps {
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function LoginTemplate({
  metaOptions: { title, description },
}: LoginTemplateProps) {
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
        <h1 className={styles["login__title"]}>Welcome to Expenses</h1>

        <p className={styles["login__new"]}>
          Are you new? <Link href="/register">Create new account</Link>
        </p>

        <div className={styles["login__content"]}>
          <LoginWithEmail />
          <StyledLink variant="ghost" href="/reset-password" align="center">
            <span>Forgot Password?</span>
          </StyledLink>
          <Separator text="or sign in with" />
          <SignInSocials />
        </div>
      </div>
    </main>
  );
}
