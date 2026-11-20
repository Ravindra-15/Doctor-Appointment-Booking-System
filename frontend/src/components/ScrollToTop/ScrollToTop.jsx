import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowUp } from "react-icons/bs";

// 1) Jumps to the top of the page whenever the route changes
// 2) Shows a floating "back to top" button after scrolling down
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[100000] w-12 h-12 rounded-full bg-primaryColor text-white
      flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
    >
      <BsArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
