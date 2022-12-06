import Head from "next/head";

import ContentTemplate from "./components/ContentTemplate/ContentTemplate";

import { UserDataContextProvider } from "@/context/UserDataContext";
import { useAuth } from "@/context/auth/AuthContext";
import Router from "next/router";

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
  const { user } = useAuth();

  // If user is not logged in, change url to /login
  if (!user) {
    Router.push("/login");
    return null;
  }

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
