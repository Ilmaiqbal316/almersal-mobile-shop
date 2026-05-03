import { Toaster as SonnerToaster } from "sonner"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Markets from './pages/Markets';
import Contact from './pages/Contact';

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-gold text-2xl">Page Not Found</div>} />
        </Routes>
        <SonnerToaster position="top-right" theme="light" />
      </Router>
    </QueryClientProvider>
  )
}

export default App