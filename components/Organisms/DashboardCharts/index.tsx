import Card from "@/Atoms/Card";
import PercentBlock from "@/Organisms/DashboardCharts/components/PercentBlock";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";

import styles from "./styles.module.scss";
import DashboardMoneyCards from "./components/DashboardMoneyCards";

function DashboardCharts() {
  return <DashboardMoneyCards />;
}

export default DashboardCharts;
