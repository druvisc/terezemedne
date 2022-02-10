import { useMemo } from "react";

import useWindowSize from "./useWindowSize";

import { BREAKPOINTS } from "../styles/variables";

const LARGE_DEVICE_PX = parseFloat(BREAKPOINTS.lg);

const useScreenSize = () => {
  const { width } = useWindowSize();

  const screenSize = useMemo(() => {
    const isMobile = width === undefined || width < LARGE_DEVICE_PX;

    return {
      isMobile,
      isDesktop: !isMobile,
    };
  }, [width]);

  return screenSize;
};

export default useScreenSize;
