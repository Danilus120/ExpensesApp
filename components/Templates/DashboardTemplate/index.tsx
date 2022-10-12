import Head from "next/head";

import Navigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";
import Button from "@/Atoms/Button";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";
import Modal from "@/Molecules/Modal";
import { useState } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
        <Navigation
          toggleSidepanel={toggleSidepanel}
          toggleModal={toggleModal}
        />
        <div className={styles.content}>{children}</div>
      </div>

      <Modal
        title="Modal 1"
        size="small"
        handleToggle={toggleModal}
        isOpened={isModalOpen}
      >
        <p>asdasdasd asdasdasd asd asda asdasdas asd asdasds</p>
        <div className="buttons" style={{ display: "flex" }}>
          <Button type="submit" variant="contained" color="success">
            <span>Submit</span>
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            callbackFn={toggleModal}
          >
            <span>Close</span>
          </Button>
        </div>
      </Modal>
    </main>
  );
}
