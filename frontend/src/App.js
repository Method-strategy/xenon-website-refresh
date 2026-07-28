import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

import Home from "@/pages/Home";
import System from "@/pages/System";
import Iris from "@/pages/products/Iris";
import Exam from "@/pages/products/Exam";
import Fit from "@/pages/products/Fit";
import Lab from "@/pages/products/Lab";
import About from "@/pages/About";
import Team from "@/pages/Team";
import News from "@/pages/News";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/NotFound";
import CookieConsent from "@/components/common/CookieConsent";

function Layout() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
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
              <Route path="/xolab-eyewear-finishing" element={<Lab />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/news" element={<News />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-a-demo" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
