import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll to top on route change.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
