import Head from "next/head";

import ContentTemplate from "./components/ContentTemplate/ContentTemplate";

import { UserDataContextProvider } from "@/context/UserDataContext";

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
  return (
    <>
      <Head>
        <title>{metaOptions.title}</title>
        <meta name="description" content={metaOptions.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserDataContextProvider>
        <ContentTemplate>{children}</ContentTemplate>
      </UserDataContextProvider>
    </>
  );
}
