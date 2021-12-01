import { useMemo } from "react";

import useWindowSize from "./useWindowSize";

import { BREAKPOINTS } from "../styles/variables";

const useScreenSize = () => {
  const { width } = useWindowSize();

  const screenSize = useMemo(() => {
    const isMobile = width && width < BREAKPOINTS.lg;

    return {
      isMobile,
      isDesktop: !isMobile,
    };
  }, [width]);

  return screenSize;
};

export default useScreenSize;
