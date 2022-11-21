import Head from "next/head";
import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";
import { UserDataContextProvider } from "@/context/UserDataContext";
import useSidepanel from "@/hooks/useSidepanel";
import styles from "./styles.module.scss";

interface DashboardTemplateProps {
  children: React.ReactNode;
  metaOptions: {
    title: string;
    description: string;
  };
}

export default function DashboardTemplate({
  children,
  metaOptions,
}: DashboardTemplateProps) {
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
          <div
            className={`${styles["sidepanel__container"]} ${
              isSidepanelOpen && styles["sidepanel__container--active"]
            }`}
          >
            <DashboardSidePanel
              isOpen={isSidepanelOpen}
              toggleSidepanel={toggleSidepanel}
            />
          </div>
          <div className={styles.container}>
            <DashboardNavigation toggleSidepanel={toggleSidepanel} />
            <main className={styles.content}>{children}</main>
          </div>
        </div>
      </UserDataContextProvider>
    </>
  );
}
