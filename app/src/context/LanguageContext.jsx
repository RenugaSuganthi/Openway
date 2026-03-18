import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  tamil: {
    // Navigation
    home: 'முகப்பு',
    complaint: 'புகார்',
    transport: 'போக்குவரத்து',
    liveTracking: 'நேரடி கண்காணிப்பு',
    support: 'ஆதரவு',
    login: 'உள்நுழைவு',
    signup: 'பதிவு',
    
    // Home Page
    welcome: 'OpenWay-க்கு வரவேற்கிறோம்',
    tagline: 'தமிழ்நாடு அரசு சேவைகளின் ஒருங்கிணைந்த மையம்',
    description: 'பேருந்து கண்காணிப்பு, புகார் மேலாண்மை, மற்றும் சமூக ஆதரவு - அனைத்தும் ஒரே இடத்தில்',
    exploreServices: 'சேவைகளை ஆராயுங்கள்',
    dashboard: 'டாஷ்போர்டு',
    quickLinks: 'விரைவு இணைப்புகள்',
    trackBus: 'பேருந்தை கண்காணிக்கவும்',
    fileComplaint: 'புகார் தாக்கல் செய்யவும்',
    getSupport: 'ஆதரவு பெறவும்',
    
    // Features
    features: 'சிறப்பம்சங்கள்',
    realTimeTracking: 'நேரடி கண்காணிப்பு',
    realTimeTrackingDesc: 'தமிழ்நாடு அரசு பேருந்துகளின் நேரடி இருப்பிடத்தை கண்காணிக்கவும்',
    complaintManagement: 'புகார் மேலாண்மை',
    complaintManagementDesc: 'போக்குவரத்து சிக்கல்களை எளிதாக புகார் செய்து கண்காணிக்கவும்',
    anonymousSupport: 'அநாமதேய ஆதரவு',
    anonymousSupportDesc: 'கல்வி, மருத்துவம், உணவு மற்றும் ஆலோசனை ஆதரவை பெறவும்',
    
    // Complaint Page
    complaintTitle: 'புகார் தாக்கல்',
    complaintSubtitle: 'உங்கள் புகார்களை அதிகாரிகளுக்கு நேரடியாக அனுப்பவும்',
    yourName: 'உங்கள் பெயர்',
    email: 'மின்னஞ்சல்',
    phone: 'கைபேசி எண்',
    complaintType: 'புகார் வகை',
    busDelay: 'பேருந்து தாமதம்',
    overcrowding: 'அதிக கூட்டம்',
    infrastructure: 'கட்டமைப்பு சிக்கல்',
    behavior: 'நடத்தை பிரச்சனை',
    other: 'மற்றவை',
    busNumber: 'பேருந்து எண்',
    route: 'வழி',
    complaintDetails: 'புகார் விவரங்கள்',
    submitComplaint: 'புகாரை அனுப்பவும்',
    complaintSuccess: 'புகார் வெற்றிகரமாக அனுப்பப்பட்டது!',
    trackId: 'கண்காணிப்பு எண்',
    
    // Transport Page
    transportTitle: 'போக்குவரத்து சேவைகள்',
    busService: 'பேருந்து சேவை',
    busServiceDesc: 'தமிழ்நாடு அரசு பேருந்துகள் - TNSTC, SETC',
    trainService: 'ரயில் சேவை',
    trainServiceDesc: 'இந்திய ரயில்வே இணைப்புகள் மற்றும் PNR நிலை',
    flightService: 'விமான சேவை',
    flightServiceDesc: 'உள்நாட்டு மற்றும் சர்வதேச விமானங்கள்',
    shipService: 'கப்பல் சேவை',
    shipServiceDesc: 'அரசு கப்பல் பயணங்கள் மற்றும் சுற்றுலா',
    visaInfo: 'விசா & பாஸ்போர்ட் தகவல்',
    visaFreeCountries: 'விசா இல்லா நாடுகள் இந்தியர்களுக்கு',
    passportServices: 'பாஸ்போர்ட் சேவைகள்',
    
    // Live Tracking
    trackingTitle: 'நேரடி பேருந்து கண்காணிப்பு',
    enterBusNumber: 'பேருந்து எண்ணை உள்ளிடவும்',
    trackNow: 'இப்போது கண்காணிக்கவும்',
    busLocation: 'பேருந்து இருப்பிடம்',
    estimatedArrival: 'மதிப்பிடப்பட்ட வருகை',
    currentSpeed: 'தற்போதைய வேகம்',
    nextStop: 'அடுத்த நிறுத்தம்',
    
    // Support Page
    supportTitle: 'ஆதரவு மையம்',
    supportSubtitle: 'உங்களுக்கு தேவையான உதவியை பெறுங்கள்',
    schoolFees: 'பள்ளி கட்டணம்',
    schoolFeesDesc: 'கல்வி உதவித்தொகை மற்றும் கட்டண ஆதரவு',
    foodSupport: 'உணவு ஆதரவு',
    foodSupportDesc: 'உணவு பொருட்கள் மற்றும் அத்தியாவசியங்கள்',
    medicalSupport: 'மருத்துவ ஆதரவு',
    medicalSupportDesc: 'மருத்துவ செலவுகள் மற்றும் சிகிச்சை உதவி',
    groceries: 'மளிகை பொருட்கள்',
    groceriesDesc: 'தினசரி மளிகை பொருட்கள் ஆதரவு',
    counseling: 'ஆலோசனை',
    counselingDesc: 'மனநலம் மற்றும் வழிகாட்டு ஆலோசனை',
    requestHelp: 'உதவி கோருங்கள்',
    anonymous: 'அநாமதேயமாக கோருங்கள்',
    
    // Login/Signup
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    forgotPassword: 'கடவுச்சொல் மறந்ததா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    createAccount: 'கணக்கை உருவாக்கவும்',
    loginButton: 'உள்நுழைக',
    
    // Footer
    contactUs: 'தொடர்பு கொள்ளுங்கள்',
    aboutUs: 'எங்களை பற்றி',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    termsOfService: 'சேவை விதிமுறைகள்',
    allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
  },
  english: {
    // Navigation
    home: 'Home',
    complaint: 'Complaint',
    transport: 'Transport',
    liveTracking: 'Live Tracking',
    support: 'Support',
    login: 'Login',
    signup: 'Sign Up',
    
    // Home Page
    welcome: 'Welcome to OpenWay',
    tagline: 'Unified Portal for Tamil Nadu Government Services',
    description: 'Bus tracking, complaint management, and social support - all in one place',
    exploreServices: 'Explore Services',
    dashboard: 'Dashboard',
    quickLinks: 'Quick Links',
    trackBus: 'Track Bus',
    fileComplaint: 'File Complaint',
    getSupport: 'Get Support',
    
    // Features
    features: 'Features',
    realTimeTracking: 'Real-Time Tracking',
    realTimeTrackingDesc: 'Track live location of Tamil Nadu Government buses',
    complaintManagement: 'Complaint Management',
    complaintManagementDesc: 'Easily file and track transport-related complaints',
    anonymousSupport: 'Anonymous Support',
    anonymousSupportDesc: 'Get support for education, medical, food, and counseling',
    
    // Complaint Page
    complaintTitle: 'File a Complaint',
    complaintSubtitle: 'Send your complaints directly to officials',
    yourName: 'Your Name',
    email: 'Email',
    phone: 'Phone Number',
    complaintType: 'Complaint Type',
    busDelay: 'Bus Delay',
    overcrowding: 'Overcrowding',
    infrastructure: 'Infrastructure Issue',
    behavior: 'Behavior Issue',
    other: 'Other',
    busNumber: 'Bus Number',
    route: 'Route',
    complaintDetails: 'Complaint Details',
    submitComplaint: 'Submit Complaint',
    complaintSuccess: 'Complaint submitted successfully!',
    trackId: 'Tracking ID',
    
    // Transport Page
    transportTitle: 'Transport Services',
    busService: 'Bus Service',
    busServiceDesc: 'Tamil Nadu Government Buses - TNSTC, SETC',
    trainService: 'Train Service',
    trainServiceDesc: 'Indian Railway connections and PNR status',
    flightService: 'Flight Service',
    flightServiceDesc: 'Domestic and international flights',
    shipService: 'Ship Service',
    shipServiceDesc: 'Government ship cruises and tourism',
    visaInfo: 'Visa & Passport Info',
    visaFreeCountries: 'Visa-Free Countries for Indians',
    passportServices: 'Passport Services',
    
    // Live Tracking
    trackingTitle: 'Live Bus Tracking',
    enterBusNumber: 'Enter Bus Number',
    trackNow: 'Track Now',
    busLocation: 'Bus Location',
    estimatedArrival: 'Estimated Arrival',
    currentSpeed: 'Current Speed',
    nextStop: 'Next Stop',
    
    // Support Page
    supportTitle: 'Support Center',
    supportSubtitle: 'Get the help you need',
    schoolFees: 'School Fees',
    schoolFeesDesc: 'Education scholarships and fee support',
    foodSupport: 'Food Support',
    foodSupportDesc: 'Food supplies and essentials',
    medicalSupport: 'Medical Support',
    medicalSupportDesc: 'Medical expenses and treatment assistance',
    groceries: 'Groceries',
    groceriesDesc: 'Daily grocery items support',
    counseling: 'Counseling',
    counselingDesc: 'Mental health and guidance counseling',
    requestHelp: 'Request Help',
    anonymous: 'Request Anonymously',
    
    // Login/Signup
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    loginButton: 'Login',
    
    // Footer
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'All Rights Reserved',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('openway-language') || 'tamil';
  });

  useEffect(() => {
    localStorage.setItem('openway-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tamil' ? 'english' : 'tamil');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
