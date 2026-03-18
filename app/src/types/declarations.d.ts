// Type declarations for JSX modules
declare module '*.jsx' {
  import type { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
}

declare module './context/LanguageContext' {
  export const LanguageProvider: React.FC<{ children: React.ReactNode }>;
  export function useLanguage(): {
    t: (key: string) => string;
    language: 'tamil' | 'english';
    toggleLanguage: () => void;
  };
}

declare module './pages/HomePage' {
  const HomePage: React.FC;
  export default HomePage;
}

declare module './pages/ComplaintPage' {
  const ComplaintPage: React.FC;
  export default ComplaintPage;
}

declare module './pages/TransportPage' {
  const TransportPage: React.FC;
  export default TransportPage;
}

declare module './pages/LiveTrackingPage' {
  const LiveTrackingPage: React.FC;
  export default LiveTrackingPage;
}

declare module './pages/LoginPage' {
  const LoginPage: React.FC;
  export default LoginPage;
}

declare module './pages/SignUpPage' {
  const SignUpPage: React.FC;
  export default SignUpPage;
}

declare module './pages/SupportPage' {
  const SupportPage: React.FC;
  export default SupportPage;
}
