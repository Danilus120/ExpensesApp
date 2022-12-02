import { useEffect, useState } from "react";
import useWindowWidth from "./useWindowWidth";

const useSidepanel = () => {
  const width = useWindowWidth(20);

  const [isSidepanelOpen, setisSidepanelOpen] = useState(true);

  useEffect(() => {
    setisSidepanelOpen(Number(width) >= 1200);
  }, [width]);

  const toggleSidepanel = () => {
    setisSidepanelOpen((prev) => !prev);
  };

  return { isSidepanelOpen, toggleSidepanel };
};

export default useSidepanel;
