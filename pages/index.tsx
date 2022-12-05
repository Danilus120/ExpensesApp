import { NextPage } from "next";

import HomePageTemplate from "@/Templates/HomePageTemplate";
// import HomePageContent from "@/Templates/HomePageTemplate/old/content";
import HomePageContent from "@/Templates/HomePageTemplate/content";

const Home: NextPage = () => {
  return (
    <HomePageTemplate metaOptions={{ title: "Home", description: "Home Page" }}>
      <HomePageContent />
    </HomePageTemplate>
  );
};

export default Home;
