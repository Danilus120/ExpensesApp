import Head from "next/head";

import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";

import { UserDataContextProvider } from "@/context/UserDataContext";

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
    <>
      <Head>
        <title>{metaOptions.title}</title>
        <meta name="description" content={metaOptions.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserDataContextProvider>
        <div className={styles.main}>
          <DashboardSidePanel
            isOpen={isSidepanelOpen}
            toggleSidepanel={toggleSidepanel}
          />
          <div className={styles.container}>
            <DashboardNavigation toggleSidepanel={toggleSidepanel} />
            <main className={styles.content}>{children}</main>
          </div>
        </div>
      </UserDataContextProvider>
    </>
  );
}
