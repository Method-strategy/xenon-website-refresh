import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

// Home is the highest-traffic entry point and stays in the main bundle so
// the very first page load never waits on a lazy chunk. Every other route
// is code-split so visiting Home doesn't also download the code for
// Fit/Iris/Exam/Lab/etc - this is what actually gates mobile LCP, since the
// browser can't render anything until the JS for the matched route has
// downloaded, parsed, and executed.
import Home from "@/pages/Home";
const System = lazy(() => import("@/pages/System"));
const Iris = lazy(() => import("@/pages/products/Iris"));
const Exam = lazy(() => import("@/pages/products/Exam"));
const Fit = lazy(() => import("@/pages/products/Fit"));
const FitCore = lazy(() => import("@/pages/products/FitCore"));
const FitMobile = lazy(() => import("@/pages/products/FitMobile"));
const FitVto = lazy(() => import("@/pages/products/FitVto"));
const Lab = lazy(() => import("@/pages/products/Lab"));
const About = lazy(() => import("@/pages/About"));
const Team = lazy(() => import("@/pages/Team"));
const News = lazy(() => import("@/pages/News"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import CookieConsent from "@/components/common/CookieConsent";

function Layout() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/xo-vision-care-system" element={<System />} />
              <Route path="/xoiris-scheduling" element={<Iris />} />
              <Route path="/xoexam-eye-exam" element={<Exam />} />
              <Route path="/xofit-frame-fitting" element={<Fit />} />
              <Route path="/xofit-core" element={<FitCore />} />
              <Route path="/xofit-mobile" element={<FitMobile />} />
              <Route path="/xofit-vto" element={<FitVto />} />
              <Route path="/xolab-eyewear-finishing" element={<Lab />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/news" element={<News />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-a-demo" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/terms-and-conditions" element={<TermsOfService />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
