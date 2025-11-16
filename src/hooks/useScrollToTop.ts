import { useEffect } from "react";

/**
 * Custom hook to scroll to the top of the page
 * @param dependencies - Optional array of dependencies that trigger scroll when changed
 */
export const useScrollToTop = (dependencies: any[] = []) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dependencies);
};
