import Head from "next/head";
import Navigation from "@/Molecules/Navigation";
import styles from "./styles.module.scss";

interface HomePageTemplateProps {
  children: React.ReactNode;
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function HomePageTemplate({
  children,
  metaOptions,
}: HomePageTemplateProps) {
  return (
    <div>
      <Head>
        <title>{metaOptions.title}</title>
        <meta name="description" content={metaOptions.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />

        {children}
      </main>
    </div>
  );
}
