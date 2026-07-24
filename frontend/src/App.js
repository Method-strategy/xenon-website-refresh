import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function Layout() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-a-demo" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
