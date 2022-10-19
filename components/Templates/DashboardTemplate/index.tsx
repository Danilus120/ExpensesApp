import Head from "next/head";

import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";
import { updateExpenses } from "lib/firebaseMethods";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();

  const expenses = [
    {
      id: "1",
      date: 15455154512,
      category: "Eat",
      shopName: "Walmart",
      price: 12,
      currency: "USD",
      description: "",
    },
    {
      id: "2",
      date: 15455154512,
      category: "Games",
      shopName: "Kinguin",
      price: 40,
      currency: "USD",
      description: "Cod",
    },
  ];

  user && updateExpenses(user.uid, expenses);
  // console.log(getUserData());

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
