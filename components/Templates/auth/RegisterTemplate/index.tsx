import Head from "next/head";
import Link from "next/link";

import RegisterWithEmail from "@/Organisms/auth/RegisterWithEmail";
import SignInSocials from "@/Organisms/auth/SignInSocials";
import LogoLink from "@/Atoms/LogoLink";
import Separator from "@/Atoms/Separator";

import styles from "../styles.module.scss";

interface RegisterTemplateI {
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function RegisterTemplate({
  metaOptions: { title, description },
}: RegisterTemplateI) {
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
          Have you already account? <Link href="/login">Go to login</Link>
        </p>

        <div className={styles["login__content"]}>
          <RegisterWithEmail />
          <Separator text="or sign in with" />
          <SignInSocials />
        </div>
      </div>
    </main>
  );
}
