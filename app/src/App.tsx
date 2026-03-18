import { useState, useEffect, type ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ComplaintPage from './pages/ComplaintPage';
import TransportPage from './pages/TransportPage';
import LiveTrackingPage from './pages/LiveTrackingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';

// Page Transition Component
interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return null;
};

// App Routes
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/complaint" 
          element={
            <PageTransition>
              <ProtectedRoute>
                <ComplaintPage />
              </ProtectedRoute>
            </PageTransition>
          } 
        />
        <Route 
          path="/transport" 
          element={
            <PageTransition>
              <TransportPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/tracking" 
          element={
            <PageTransition>
              <ProtectedRoute>
                <LiveTrackingPage />
              </ProtectedRoute>
            </PageTransition>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PageTransition>
              <SignUpPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/support" 
          element={
            <PageTransition>
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            </PageTransition>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PageTransition>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </PageTransition>
          } 
        />
      </Routes>
    </>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
              />
            </svg>
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            OpenWay
          </motion.h1>
          <motion.p 
            className="text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading...
          </motion.p>
          
          {/* Loading Bar */}
          <motion.div 
            className="mt-6 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-700"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
