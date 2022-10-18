import Head from "next/head";

import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";

interface DashboardLayoutI {
  children: React.ReactNode;
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function DashboardLayout({
  children,
  metaOptions,
}: DashboardLayoutI) {
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();

  return (
    <main className={styles.main}>
      <Head>
        <title>{metaOptions.title}</title>
        <meta name="description" content={metaOptions.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardSidePanel
        isOpen={isSidepanelOpen}
        toggleSidepanel={toggleSidepanel}
      />
      <div className={styles.container}>
        <DashboardNavigation toggleSidepanel={toggleSidepanel} />
        <div className={styles.content}>{children}</div>
      </div>
    </main>
  );
}
