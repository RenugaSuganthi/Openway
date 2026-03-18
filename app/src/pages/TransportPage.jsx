import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bus, Train, Plane, Ship, MapPin, Clock, ArrowRight, Globe, Menu, X,
  ExternalLink, Info, CheckCircle, Contact, FileText, Calendar, DollarSign,
  Users, Calculator, Search, Lock, Navigation, TrainFront
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '@/components/Navbar';

const TransportPageContent = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bus');
  
  // Train PNR Status
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState(null);
  const [pnrLoading, setPnrLoading] = useState(false);
  
  // Live Train Status
  const [trainNumber, setTrainNumber] = useState('');
  const [liveTrainStatus, setLiveTrainStatus] = useState(null);
  const [trainLoading, setTrainLoading] = useState(false);
  
  // Flight Fare Calculator
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [fareEstimate, setFareEstimate] = useState(null);
  const [calculating, setCalculating] = useState(false);
  
  // Real-time Bus Tracking
  const [busNumber, setBusNumber] = useState('');
  const [busLocation, setBusLocation] = useState(null);
  const [busLoading, setBusLoading] = useState(false);
  const [nearbyBuses, setNearbyBuses] = useState([]);

  const indianCities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem',
    'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Kolkata',
    'Kochi', 'Trivandrum', 'Goa', 'Pune', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Chandigarh', 'Guwahati', 'Bhubaneswar'
  ];

  const navLinks = [
    { name: t('home'), href: '#/' },
    { name: t('complaint'), href: '#/complaint' },
    { name: t('transport'), href: '#/transport' },
    { name: t('liveTracking'), href: '#/tracking' },
    { name: t('support'), href: '#/support' },
  ];

  // Real-time PNR Status Check using IRCTC/Railway API
  const checkPNRStatus = async () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      alert(language === 'tamil' ? 'சரியான PNR எண்ணை உள்ளிடவும்' : 'Please enter a valid 10-digit PNR number');
      return;
    }

    setPnrLoading(true);
    try {
      // Using Railway API (replace with your API key)
      // const response = await fetch(`https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnr=${pnrNumber}`, {
      //   headers: {
      //     'X-RapidAPI-Key': 'YOUR_API_KEY',
      //     'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      //   }
      // });
      
      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPnrStatus({
        pnr: pnrNumber,
        trainName: 'Chennai Express (12602)',
        trainNumber: '12602',
        from: 'Chennai Central (MAS)',
        to: 'Mumbai CST (CSTM)',
        date: '2024-12-20',
        class: 'Sleeper (SL)',
        chartPrepared: false,
        passengers: [
          { seat: 'S3-45', status: 'CNF', coach: 'S3', currentStatus: 'CNF' },
          { seat: 'S3-46', status: 'CNF', coach: 'S3', currentStatus: 'CNF' }
        ],
        bookingStatus: 'CONFIRMED',
        quota: 'GENERAL'
      });
    } catch (error) {
      alert(language === 'tamil' ? 'PNR நிலையை பெற முடியவில்லை' : 'Could not fetch PNR status');
    } finally {
      setPnrLoading(false);
    }
  };

  // Live Running Train Status
  const checkLiveTrainStatus = async () => {
    if (!trainNumber) {
      alert(language === 'tamil' ? 'ரயில் எண்ணை உள்ளிடவும்' : 'Please enter train number');
      return;
    }

    setTrainLoading(true);
    try {
      // Using Railway API for live status
      // const response = await fetch(`https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNumber}`, {
      //   headers: {
      //     'X-RapidAPI-Key': 'YOUR_API_KEY',
      //     'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      //   }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLiveTrainStatus({
        trainNumber: trainNumber,
        trainName: 'Cheran Express (12674)',
        currentStation: 'Salem Junction (SA)',
        nextStation: 'Erode Junction (ED)',
        delay: 15,
        expectedArrival: '14:30',
        expectedDeparture: '14:35',
        platform: '3',
        distance: 342,
        totalDistance: 498,
        speed: 65,
        status: 'Running',
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (error) {
      alert(language === 'tamil' ? 'ரயில் நிலையை பெற முடியவில்லை' : 'Could not fetch train status');
    } finally {
      setTrainLoading(false);
    }
  };

  // Real-time Bus Tracking
  const trackBus = async () => {
    if (!busNumber) {
      alert(language === 'tamil' ? 'பேருந்து எண்ணை உள்ளிடவும்' : 'Please enter bus number');
      return;
    }

    setBusLoading(true);
    try {
      // Using TNSTC/RedBus API
      // const response = await fetch(`https://api.redbus.in/v2/bus/track/${busNumber}`);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBusLocation({
        busNumber: busNumber,
        route: 'Chennai - Coimbatore',
        currentLocation: 'Salem',
        nextStop: 'Erode',
        estimatedArrival: '2h 30m',
        speed: 65,
        status: 'On Time',
        latitude: 11.6643,
        longitude: 78.1460,
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (error) {
      alert(language === 'tamil' ? 'பேருந்து இருப்பிடத்தை பெற முடியவில்லை' : 'Could not fetch bus location');
    } finally {
      setBusLoading(false);
    }
  };

  // Find Nearby Buses
  const findNearbyBuses = async () => {
    if (!navigator.geolocation) {
      alert(language === 'tamil' ? 'உங்கள் உலாவி இருப்பிட அணுகலை ஆதரிக்கவில்லை' : 'Your browser does not support geolocation');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Mock nearby buses
        setNearbyBuses([
          { busNumber: 'TN-01-1234', route: 'Chennai - Coimbatore', distance: '0.5 km', eta: '5 min', type: 'Ultra Deluxe' },
          { busNumber: 'TN-01-5678', route: 'Chennai - Bangalore', distance: '1.2 km', eta: '12 min', type: 'Super Deluxe' },
          { busNumber: 'TN-01-9012', route: 'Chennai - Madurai', distance: '2.0 km', eta: '18 min', type: 'Express' },
        ]);
      },
      (error) => {
        alert(language === 'tamil' ? 'இருப்பிடத்தை அணுக முடியவில்லை' : 'Could not access location');
      }
    );
  };

  const tabs = [
    { id: 'bus', label: language === 'tamil' ? 'பேருந்து' : 'Bus', icon: Bus },
    { id: 'train', label: language === 'tamil' ? 'ரயில்' : 'Train', icon: Train },
    { id: 'flight', label: language === 'tamil' ? 'விமானம்' : 'Flight', icon: Plane },
    { id: 'ship', label: language === 'tamil' ? 'கப்பல்' : 'Ship', icon: Ship },
    { id: 'visa', label: language === 'tamil' ? 'விசா/பாஸ்போர்ட்' : 'Visa/Passport', icon: Contact },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navbar/>
      

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{t('transportTitle')}</h1>
            <p className="text-gray-600">{language === 'tamil' ? 'அனைத்து போக்குவரத்து சேவைகளையும் ஒரே இடத்தில் கண்டறியுங்கள்' : 'Discover all transportation services in one place'}</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Bus Tracking */}
          {activeTab === 'bus' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Real-time Bus Tracking */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'tamil' ? 'நேரடி பேருந்து கண்காணிப்பு' : 'Real-time Bus Tracking'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value.toUpperCase())}
                    placeholder={language === 'tamil' ? 'பேருந்து எண்ணை உள்ளிடவும்' : 'Enter Bus Number'}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    onClick={trackBus}
                    disabled={busLoading}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {busLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Search className="w-4 h-4" /><span>{language === 'tamil' ? 'கண்காணிக்கவும்' : 'Track'}</span></>}
                  </button>
                  <button
                    onClick={findNearbyBuses}
                    className="px-6 py-3 rounded-xl bg-green-500 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{language === 'tamil' ? 'அருகிலுள்ள பேருந்துகள்' : 'Nearby Buses'}</span>
                  </button>
                </div>

                {busLocation && (
                  <motion.div className="mt-4 p-4 bg-blue-50 rounded-xl" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'தற்போதைய இருப்பிடம்' : 'Current Location'}</p><p className="font-bold text-gray-900">{busLocation.currentLocation}</p></div>
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'அடுத்த நிறுத்தம்' : 'Next Stop'}</p><p className="font-bold text-gray-900">{busLocation.nextStop}</p></div>
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'வருகை நேரம்' : 'ETA'}</p><p className="font-bold text-green-600">{busLocation.estimatedArrival}</p></div>
                    </div>
                  </motion.div>
                )}

                {nearbyBuses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">{language === 'tamil' ? 'அருகிலுள்ள பேருந்துகள்' : 'Nearby Buses'}</h4>
                    <div className="space-y-2">
                      {nearbyBuses.map((bus, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{bus.busNumber}</p>
                            <p className="text-sm text-gray-500">{bus.route}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-green-600">{bus.eta}</p>
                            <p className="text-xs text-gray-400">{bus.distance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Train Services with Real-time APIs */}
          {activeTab === 'train' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* PNR Status Check */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Train className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'tamil' ? 'PNR நிலை சரிபார்ப்பு' : 'Check PNR Status'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value)}
                    placeholder={language === 'tamil' ? '10 இலக்க PNR எண்ணை உள்ளிடவும்' : 'Enter 10-digit PNR Number'}
                    maxLength={10}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    onClick={checkPNRStatus}
                    disabled={pnrLoading}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {pnrLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Search className="w-4 h-4" /><span>{language === 'tamil' ? 'சரிபார்க்கவும்' : 'Check'}</span></>}
                  </button>
                </div>

                {pnrStatus && (
                  <motion.div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">{pnrStatus.trainName}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">{language === 'tamil' ? 'இருந்து:' : 'From:'}</span><p className="font-medium">{pnrStatus.from}</p></div>
                      <div><span className="text-gray-500">{language === 'tamil' ? 'செல்லும் இடம்:' : 'To:'}</span><p className="font-medium">{pnrStatus.to}</p></div>
                      <div><span className="text-gray-500">{language === 'tamil' ? 'தேதி:' : 'Date:'}</span><p className="font-medium">{pnrStatus.date}</p></div>
                      <div><span className="text-gray-500">{language === 'tamil' ? 'வகுப்பு:' : 'Class:'}</span><p className="font-medium">{pnrStatus.class}</p></div>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-500">{language === 'tamil' ? 'பயணிகள்:' : 'Passengers:'}</span>
                      {pnrStatus.passengers.map((p, i) => (
                        <p key={i} className="font-medium text-green-700">{language === 'tamil' ? 'பயணி' : 'Passenger'} {i + 1}: {p.status} - {p.seat}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Live Train Status */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrainFront className="w-5 h-5 mr-2 text-green-600" />
                  {language === 'tamil' ? 'நேரடி ரயில் நிலை' : 'Live Train Status'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    placeholder={language === 'tamil' ? 'ரயில் எண்ணை உள்ளிடவும்' : 'Enter Train Number'}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    onClick={checkLiveTrainStatus}
                    disabled={trainLoading}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {trainLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Navigation className="w-4 h-4" /><span>{language === 'tamil' ? 'நிலையை காண்க' : 'View Status'}</span></>}
                  </button>
                </div>

                {liveTrainStatus && (
                  <motion.div className="mt-4 p-4 bg-green-50 rounded-xl" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'தற்போதைய நிலையம்' : 'Current Station'}</p><p className="font-bold text-gray-900">{liveTrainStatus.currentStation}</p></div>
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'தாமதம்' : 'Delay'}</p><p className={`font-bold ${liveTrainStatus.delay > 0 ? 'text-red-600' : 'text-green-600'}`}>{liveTrainStatus.delay} min</p></div>
                      <div><p className="text-sm text-gray-500">{language === 'tamil' ? 'வேகம்' : 'Speed'}</p><p className="font-bold text-blue-600">{liveTrainStatus.speed} km/h</p></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Flight Services with Fare Calculator */}
          {activeTab === 'flight' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Flight Fare Calculator */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'tamil' ? 'விமான கட்டண கணிப்பான்' : 'Flight Fare Calculator'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{language === 'tamil' ? 'இருந்து' : 'From'}</label>
                    <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                      <option value="">{language === 'tamil' ? 'நகரை தேர்வு செய்க' : 'Select City'}</option>
                      {indianCities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{language === 'tamil' ? 'செல்லும் இடம்' : 'To'}</label>
                    <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                      <option value="">{language === 'tamil' ? 'நகரை தேர்வு செய்க' : 'Select City'}</option>
                      {indianCities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{language === 'tamil' ? 'தேதி' : 'Date'}</label>
                    <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{language === 'tamil' ? 'பயணிகள்' : 'Passengers'}</label>
                    <input type="number" min="1" max="10" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!fromCity || !toCity || fromCity === toCity) {
                      alert(language === 'tamil' ? 'சரியான நகரங்களை தேர்வு செய்க' : 'Please select valid cities');
                      return;
                    }
                    setCalculating(true);
                    const baseFare = 2500;
                    const distance = Math.abs(indianCities.indexOf(fromCity) - indianCities.indexOf(toCity)) * 150 + 500;
                    const fare = Math.round((baseFare + distance * 3) * passengers);
                    setTimeout(() => {
                      setFareEstimate({ from: fromCity, to: toCity, baseFare, distance, totalFare: fare, passengers, perPerson: Math.round(fare / passengers) });
                      setCalculating(false);
                    }, 1000);
                  }}
                  disabled={calculating}
                  className="mt-4 w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {calculating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Search className="w-4 h-4" /><span>{language === 'tamil' ? 'கட்டணத்தை கணக்கிடு' : 'Calculate Fare'}</span></>}
                </button>

                {fareEstimate && (
                  <motion.div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{fareEstimate.from} → {fareEstimate.to}</span>
                      <span className="text-sm text-gray-500">{fareEstimate.distance} km</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-700">{language === 'tamil' ? 'மொத்த கட்டணம்:' : 'Total Fare:'}</span>
                      <span className="text-2xl font-bold text-green-700">₹{fareEstimate.totalFare.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">₹{fareEstimate.perPerson.toLocaleString()} {language === 'tamil' ? 'ஒரு நபருக்கு' : 'per person'}</p>
                  </motion.div>
                )}
              </div>

              {/* Major Indian Airlines */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'tamil' ? 'முக்கிய இந்திய விமான நிறுவனங்கள்' : 'Major Indian Airlines'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Air India', code: 'AI', color: 'bg-red-600', website: 'https://www.airindia.com' },
                    { name: 'IndiGo', code: '6E', color: 'bg-blue-700', website: 'https://www.goindigo.in' },
                    { name: 'Vistara', code: 'UK', color: 'bg-purple-700', website: 'https://www.airvistara.com' },
                    { name: 'SpiceJet', code: 'SG', color: 'bg-red-500', website: 'https://www.spicejet.com' },
                    { name: 'AirAsia India', code: 'I5', color: 'bg-red-500', website: 'https://www.airasia.co.in' },
                    { name: 'Go First', code: 'G8', color: 'bg-orange-500', website: 'https://www.flygofirst.com' },
                    { name: 'Alliance Air', code: '9I', color: 'bg-orange-600', website: 'https://www.allianceair.in' },
                    { name: 'Star Air', code: 'S5', color: 'bg-yellow-500', website: 'https://www.starair.in' }
                  ].map((airline) => (
                    <a key={airline.code} href={airline.website} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 ${airline.color} rounded-lg flex items-center justify-center text-white font-bold mb-2`}>{airline.code}</div>
                      <p className="font-medium text-gray-900">{airline.name}</p>
                      <p className="text-sm text-gray-500">{language === 'tamil' ? 'முன்பதிவு செய்ய கிளிக் செய்க' : 'Click to book'}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Major Airports in India */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  {language === 'tamil' ? 'முக்கிய விமான நிலையங்கள்' : 'Major Airports in India'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Indira Gandhi International', city: 'Delhi', code: 'DEL', type: 'International' },
                    { name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai', code: 'BOM', type: 'International' },
                    { name: 'Kempegowda International', city: 'Bangalore', code: 'BLR', type: 'International' },
                    { name: 'Chennai International', city: 'Chennai', code: 'MAA', type: 'International' },
                    { name: 'Netaji Subhas Chandra Bose', city: 'Kolkata', code: 'CCU', type: 'International' },
                    { name: 'Rajiv Gandhi International', city: 'Hyderabad', code: 'HYD', type: 'International' },
                    { name: 'Cochin International', city: 'Kochi', code: 'COK', type: 'International' },
                    { name: 'Sardar Vallabhbhai Patel', city: 'Ahmedabad', code: 'AMD', type: 'International' },
                    { name: 'Pune Airport', city: 'Pune', code: 'PNQ', type: 'Domestic' }
                  ].map((airport) => (
                    <div key={airport.code} className="p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-blue-600">{airport.code}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{airport.type}</span>
                      </div>
                      <p className="font-medium text-gray-900">{airport.name}</p>
                      <p className="text-sm text-gray-500">{airport.city}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Ship Services */}
          {activeTab === 'ship' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Major Indian Ports */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Ship className="w-5 h-5 mr-2 text-blue-600" />
                  {language === 'tamil' ? 'முக்கிய இந்திய துறைமுகங்கள்' : 'Major Indian Ports'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Chennai Port', state: 'Tamil Nadu', type: 'Major', cargo: 'Container, General' },
                    { name: 'Jawaharlal Nehru Port (Nhava Sheva)', state: 'Maharashtra', type: 'Major', cargo: 'Container' },
                    { name: 'Mumbai Port', state: 'Maharashtra', type: 'Major', cargo: 'General, Passenger' },
                    { name: 'Visakhapatnam Port', state: 'Andhra Pradesh', type: 'Major', cargo: 'Iron Ore, General' },
                    { name: 'Kolkata Port (Haldia)', state: 'West Bengal', type: 'Major', cargo: 'General, Container' },
                    { name: 'Paradip Port', state: 'Odisha', type: 'Major', cargo: 'Iron Ore, Coal' },
                    { name: 'Kamarajar Port (Ennore)', state: 'Tamil Nadu', type: 'Major', cargo: 'Coal, Iron Ore' },
                    { name: 'Cochin Port', state: 'Kerala', type: 'Major', cargo: 'Container, General' },
                    { name: 'New Mangalore Port', state: 'Karnataka', type: 'Major', cargo: 'Iron Ore, Petroleum' },
                    { name: 'Tuticorin Port (V.O.C)', state: 'Tamil Nadu', type: 'Major', cargo: 'Container, General' },
                    { name: 'Kandla Port', state: 'Gujarat', type: 'Major', cargo: 'General, Petroleum' },
                    { name: 'Goa Port', state: 'Goa', type: 'Minor', cargo: 'Iron Ore, General' }
                  ].map((port, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <Ship className="w-6 h-6 text-blue-600" />
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-200 text-blue-800">{port.type}</span>
                      </div>
                      <p className="font-bold text-gray-900">{port.name}</p>
                      <p className="text-sm text-gray-600">{port.state}</p>
                      <p className="text-xs text-gray-500 mt-1">{language === 'tamil' ? 'சரக்கு:' : 'Cargo:'} {port.cargo}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cruise Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  {language === 'tamil' ? 'கப்பல் பயண சேவைகள்' : 'Cruise Services'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { 
                      name: 'Cordelia Cruises', 
                      route: 'Mumbai - Goa - Mumbai',
                      duration: '2-3 Nights',
                      price: '₹15,000+',
                      contact: 'www.cordeliacruises.com'
                    },
                    { 
                      name: 'Angriya Cruise', 
                      route: 'Mumbai - Goa',
                      duration: 'Overnight',
                      price: '₹7,000+',
                      contact: 'www.angriyacruises.com'
                    },
                    { 
                      name: 'Lakshadweep Cruise', 
                      route: 'Kochi - Lakshadweep Islands',
                      duration: '4-7 Nights',
                      price: '₹25,000+',
                      contact: 'www.lakshadweeptourism.com'
                    },
                    { 
                      name: 'Sagarmala Cruise', 
                      route: 'Chennai - Andaman',
                      duration: '3-4 Days',
                      price: '₹12,000+',
                      contact: 'www.sagarmala.gov.in'
                    },
                    { 
                      name: 'M.V. Nancowry', 
                      route: 'Chennai - Port Blair',
                      duration: '3 Days',
                      price: '₹8,000+',
                      contact: 'Direct Booking'
                    },
                    { 
                      name: 'M.V. Swaraj Dweep', 
                      route: 'Kochi - Andaman',
                      duration: '3-4 Days',
                      price: '₹10,000+',
                      contact: 'Direct Booking'
                    }
                  ].map((cruise, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-purple-100 bg-purple-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-purple-900">{cruise.name}</h4>
                        <span className="text-sm font-medium text-green-600">{cruise.price}</span>
                      </div>
                      <p className="text-sm text-gray-700"><span className="text-gray-500">{language === 'tamil' ? 'பாதை:' : 'Route:'}</span> {cruise.route}</p>
                      <p className="text-sm text-gray-700"><span className="text-gray-500">{language === 'tamil' ? 'காலம்:' : 'Duration:'}</span> {cruise.duration}</p>
                      <p className="text-sm text-blue-600 mt-2">{cruise.contact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ferry Services */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-green-600" />
                  {language === 'tamil' ? 'படகு சேவைகள்' : 'Ferry Services'}
                </h3>
                <div className="space-y-3">
                  {[
                    { route: 'Rameswaram - Talaimannar (Sri Lanka)', operator: 'Sethusamudram Corporation', duration: '1 hour', status: 'Under Development' },
                    { route: 'Kochi - Vypin - Fort Kochi', operator: 'Kerala Water Transport', duration: '15-30 min', status: 'Active' },
                    { route: 'Mumbai - Alibag - Mandwa', operator: 'Maldar Ferries', duration: '45 min', status: 'Active' },
                    { route: 'Goa - Panaji - Betim', operator: 'Goa River Navigation', duration: '10 min', status: 'Active' },
                    { route: 'Kolkata - Howrah', operator: 'WBTC', duration: '15 min', status: 'Active' },
                    { route: 'Vivekananda Rock - Kanyakumari', operator: 'Poompuhar Shipping', duration: '15 min', status: 'Active' },
                    { route: 'Havelock - Neil Island (Andaman)', operator: 'Government Ferries', duration: '1.5 hours', status: 'Active' },
                    { route: 'Port Blair - Havelock', operator: 'Makruzz/Green Ocean', duration: '1.5-2 hours', status: 'Active' }
                  ].map((ferry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{ferry.route}</p>
                        <p className="text-sm text-gray-500">{language === 'tamil' ? 'இயக்குநர்:' : 'Operator:'} {ferry.operator} | {language === 'tamil' ? 'காலம்:' : 'Duration:'} {ferry.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${ferry.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {ferry.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Visa/Passport Services */}
          {activeTab === 'visa' && <VisaPassportSection language={language} />}
        </div>
      </div>
    </div>
  );
};

// Visa/Passport Section Component
const VisaPassportSection = ({ language }) => {
  const [activeVisaTab, setActiveVisaTab] = useState('visafree');

  // Complete Visa-Free Countries for Indians (2024)
  const visaFreeCountries = [
    // Asia
    { country: 'Bhutan', days: 'No limit', region: 'Asia', notes: 'Indian citizens do not need passport' },
    { country: 'Nepal', days: 'No limit', region: 'Asia', notes: 'Indian citizens do not need passport' },
    { country: 'Maldives', days: '90 days', region: 'Asia', notes: 'Tourist visa on arrival' },
    { country: 'Sri Lanka', days: '30 days', region: 'Asia', notes: 'Electronic Travel Authorization (ETA)' },
    { country: 'Thailand', days: '60 days', region: 'Asia', notes: 'Visa exemption from Nov 2024' },
    { country: 'Malaysia', days: '30 days', region: 'Asia', notes: 'Visa-free until Dec 2026' },
    { country: 'Singapore', days: '30 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Indonesia', days: '30 days', region: 'Asia', notes: 'Visa on arrival also available' },
    { country: 'Laos', days: '30 days', region: 'Asia', notes: 'Visa on arrival' },
    { country: 'Cambodia', days: '30 days', region: 'Asia', notes: 'Visa on arrival' },
    { country: 'Vietnam', days: '30 days', region: 'Asia', notes: 'E-visa available' },
    { country: 'Philippines', days: '30 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Hong Kong', days: '14 days', region: 'Asia', notes: 'Pre-arrival registration required' },
    { country: 'Macau', days: '30 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Taiwan', days: '30 days', region: 'Asia', notes: 'Online registration required' },
    { country: 'Kazakhstan', days: '14 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Kyrgyzstan', days: '60 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Tajikistan', days: '30 days', region: 'Asia', notes: 'E-visa available' },
    { country: 'Uzbekistan', days: '30 days', region: 'Asia', notes: 'E-visa available' },
    { country: 'Mongolia', days: '30 days', region: 'Asia', notes: 'Visa-free entry' },
    { country: 'Myanmar', days: '30 days', region: 'Asia', notes: 'E-visa available' },
    { country: 'Timor-Leste', days: '30 days', region: 'Asia', notes: 'Visa on arrival' },
    
    // Middle East
    { country: 'Iran', days: '30 days', region: 'Middle East', notes: 'Visa on arrival' },
    { country: 'Jordan', days: '30 days', region: 'Middle East', notes: 'Visa on arrival' },
    { country: 'Qatar', days: '30 days', region: 'Middle East', notes: 'Visa-free entry' },
    { country: 'Oman', days: '30 days', region: 'Middle East', notes: 'Visa-free entry' },
    { country: 'Bahrain', days: '14 days', region: 'Middle East', notes: 'Visa on arrival' },
    { country: 'Kuwait', days: '30 days', region: 'Middle East', notes: 'E-visa or visa on arrival' },
    { country: 'Saudi Arabia', days: '30 days', region: 'Middle East', notes: 'E-visa or visa on arrival' },
    { country: 'United Arab Emirates', days: '60 days', region: 'Middle East', notes: 'Visa-free entry' },
    
    // Africa
    { country: 'Mauritius', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Seychelles', days: '90 days', region: 'Africa', notes: 'Visitor permit on arrival' },
    { country: 'Kenya', days: '90 days', region: 'Africa', notes: 'E-visa or visa on arrival' },
    { country: 'Tanzania', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Uganda', days: '90 days', region: 'Africa', notes: 'E-visa or visa on arrival' },
    { country: 'Rwanda', days: '30 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Ethiopia', days: '90 days', region: 'Africa', notes: 'E-visa or visa on arrival' },
    { country: 'Madagascar', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Morocco', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Tunisia', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Senegal', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Gambia', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Botswana', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Zimbabwe', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Zambia', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Malawi', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Mozambique', days: '30 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Namibia', days: '90 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Eswatini (Swaziland)', days: '30 days', region: 'Africa', notes: 'Visa-free entry' },
    { country: 'Lesotho', days: '90 days', region: 'Africa', notes: 'E-visa available' },
    { country: 'Cape Verde', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Comoros', days: '45 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Djibouti', days: '30 days', region: 'Africa', notes: 'E-visa' },
    { country: 'Gabon', days: '30 days', region: 'Africa', notes: 'E-visa' },
    { country: 'Guinea-Bissau', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Mauritania', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Sierra Leone', days: '90 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Somalia', days: '30 days', region: 'Africa', notes: 'Visa on arrival' },
    { country: 'Togo', days: '7 days', region: 'Africa', notes: 'Visa on arrival' },
    
    // Caribbean
    { country: 'Barbados', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Dominica', days: '180 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Grenada', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Haiti', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Jamaica', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Saint Kitts and Nevis', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Saint Lucia', days: '42 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Saint Vincent and the Grenadines', days: '180 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Trinidad and Tobago', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Antigua and Barbuda', days: '180 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Bahamas', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'British Virgin Islands', days: '30 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Cayman Islands', days: '30 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Montserrat', days: '180 days', region: 'Caribbean', notes: 'Visa-free entry' },
    { country: 'Turks and Caicos', days: '90 days', region: 'Caribbean', notes: 'Visa-free entry' },
    
    // Oceania
    { country: 'Fiji', days: '120 days', region: 'Oceania', notes: 'Visitor permit on arrival' },
    { country: 'Micronesia', days: '30 days', region: 'Oceania', notes: 'Visa-free entry' },
    { country: 'Palau', days: '30 days', region: 'Oceania', notes: 'Visa on arrival' },
    { country: 'Samoa', days: '60 days', region: 'Oceania', notes: 'Entry permit on arrival' },
    { country: 'Tuvalu', days: '30 days', region: 'Oceania', notes: 'Visa on arrival' },
    { country: 'Vanuatu', days: '30 days', region: 'Oceania', notes: 'Visa-free entry' },
    { country: 'Cook Islands', days: '31 days', region: 'Oceania', notes: 'Visa-free entry' },
    { country: 'Niue', days: '30 days', region: 'Oceania', notes: 'Visa-free entry' },
    { country: 'Kiribati', days: '90 days', region: 'Oceania', notes: 'Visa-free entry' },
    { country: 'Marshall Islands', days: '90 days', region: 'Oceania', notes: 'Visa on arrival' },
    { country: 'Nauru', days: '30 days', region: 'Oceania', notes: 'Visa required but easy to obtain' },
    { country: 'Solomon Islands', days: '90 days', region: 'Oceania', notes: 'Visitor permit on arrival' },
    { country: 'Tonga', days: '31 days', region: 'Oceania', notes: 'Visa on arrival' },
    
    // South America
    { country: 'Bolivia', days: '90 days', region: 'South America', notes: 'Visa on arrival' },
    { country: 'Ecuador', days: '90 days', region: 'South America', notes: 'Visa-free entry' },
    { country: 'Guyana', days: '90 days', region: 'South America', notes: 'Visa-free entry' },
    { country: 'Suriname', days: '90 days', region: 'South America', notes: 'E-tourist card' },
    
    // Central America
    { country: 'Belize', days: '30 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'Costa Rica', days: '90 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'El Salvador', days: '90 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'Guatemala', days: '90 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'Honduras', days: '90 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'Nicaragua', days: '90 days', region: 'Central America', notes: 'Visa-free entry' },
    { country: 'Panama', days: '180 days', region: 'Central America', notes: 'Visa-free entry' }
  ];

  // Countries where Indians don't need Passport (only ID proof)
  const noPassportCountries = [
    { country: 'Bhutan', documents: 'Voter ID / Aadhaar / Driving License', notes: 'Freedom of Movement' },
    { country: 'Nepal', documents: 'Voter ID / Aadhaar / Driving License', notes: 'Freedom of Movement' }
  ];

  // Indian Passport Services
  const passportServices = [
    { name: 'Fresh Passport', fee: '₹1,500 (36 pages) / ₹2,000 (60 pages)', time: '30-45 days', tatkal: '₹3,500 - 1-3 days' },
    { name: 'Passport Renewal', fee: '₹1,500', time: '30-45 days', tatkal: '₹3,500 - 1-3 days' },
    { name: 'Re-issue (Lost/Damaged)', fee: '₹3,000', time: '45 days', tatkal: '₹5,000 - 1-3 days' },
    { name: 'Minor Passport (Under 18)', fee: '₹1,000', time: '30 days', tatkal: '₹3,000 - 1-3 days' },
    { name: 'Police Clearance Certificate', fee: '₹500', time: '3 weeks', tatkal: 'N/A' }
  ];

  // Visa on Arrival Countries
  const visaOnArrivalCountries = [
    { country: 'Thailand', fee: '2,000 THB', duration: '15 days' },
    { country: 'Maldives', fee: 'Free', duration: '30 days' },
    { country: 'Indonesia', fee: '500,000 IDR', duration: '30 days' },
    { country: 'Cambodia', fee: '30 USD', duration: '30 days' },
    { country: 'Laos', fee: '40 USD', duration: '30 days' },
    { country: 'Jordan', fee: '40 JOD', duration: '30 days' },
    { country: 'Kenya', fee: '50 USD', duration: '90 days' },
    { country: 'Tanzania', fee: '50 USD', duration: '90 days' },
    { country: 'Ethiopia', fee: '50 USD', duration: '90 days' },
    { country: 'Madagascar', fee: '80,000 MGA', duration: '90 days' },
    { country: 'Mauritania', fee: '55 EUR', duration: '90 days' },
    { country: 'Seychelles', fee: 'Free', duration: '90 days' },
    { country: 'Bolivia', fee: 'Free', duration: '90 days' },
    { country: 'Cape Verde', fee: '25 EUR', duration: '90 days' },
    { country: 'Comoros', fee: '30 EUR', duration: '45 days' },
    { country: 'Djibouti', fee: '90-120 USD', duration: '30 days' },
    { country: 'Guinea-Bissau', fee: '85 EUR', duration: '90 days' },
    { country: 'Malawi', fee: '75 USD', duration: '90 days' },
    { country: 'Mozambique', fee: '66 USD', duration: '30 days' },
    { country: 'Sierra Leone', fee: '80 USD', duration: '90 days' },
    { country: 'Somalia', fee: '50 USD', duration: '30 days' },
    { country: 'Togo', fee: '10,000 XOF', duration: '7 days' },
    { country: 'Uganda', fee: '50 USD', duration: '90 days' },
    { country: 'Zambia', fee: '50 USD', duration: '90 days' },
    { country: 'Zimbabwe', fee: '30 USD', duration: '90 days' },
    { country: 'Palau', fee: '50 USD', duration: '30 days' },
    { country: 'Samoa', fee: 'Free', duration: '60 days' },
    { country: 'Tuvalu', fee: '100 AUD', duration: '30 days' },
    { country: 'Marshall Islands', fee: 'Free', duration: '90 days' },
    { country: 'Solomon Islands', fee: 'Free', duration: '90 days' },
    { country: 'Tonga', fee: 'Free', duration: '31 days' }
  ];

  const visaTabs = [
    { id: 'visafree', label: language === 'tamil' ? 'விசா இல்லாமல்' : 'Visa-Free', count: visaFreeCountries.length },
    { id: 'nopassport', label: language === 'tamil' ? 'பாஸ்போர்ட் இல்லாமல்' : 'No Passport', count: noPassportCountries.length },
    { id: 'voa', label: language === 'tamil' ? 'விசா ஆன் அரைவல்' : 'Visa on Arrival', count: visaOnArrivalCountries.length },
    { id: 'passport', label: language === 'tamil' ? 'பாஸ்போர்ட் சேவைகள்' : 'Passport Services', count: passportServices.length }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Visa Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {visaTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveVisaTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeVisaTab === tab.id 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            {tab.label} <span className="text-xs opacity-75">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Visa-Free Countries */}
      {activeVisaTab === 'visafree' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            {language === 'tamil' ? 'விசா இல்லாமல் பயணம் செய்யக்கூடிய நாடுகள்' : 'Visa-Free Countries for Indians'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'tamil' 
              ? 'இந்திய பாஸ்போர்ட் வைத்திருப்பவர்கள் விசா இல்லாமல் பயணம் செய்யக்கூடிய நாடுகள் (2024)' 
              : 'Countries Indian passport holders can visit without a visa (2024)'}
          </p>
          
          {/* Region Filter */}
          {['Asia', 'Middle East', 'Africa', 'Caribbean', 'Oceania', 'South America', 'Central America'].map((region) => {
            const regionCountries = visaFreeCountries.filter(c => c.region === region);
            if (regionCountries.length === 0) return null;
            return (
              <div key={region} className="mb-6">
                <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-1" /> {region}
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {regionCountries.map((c, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-green-50 border border-green-100">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{c.country}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">{c.days}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{c.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Passport Required */}
      {activeVisaTab === 'nopassport' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Contact className="w-5 h-5 mr-2 text-blue-600" />
            {language === 'tamil' ? 'பாஸ்போர்ட் இல்லாமல் பயணம் செய்யக்கூடிய நாடுகள்' : 'Countries Without Passport (Indians)'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'tamil' 
              ? 'இந்திய குடிமக்கள் பாஸ்போர்ட் இல்லாமல் வாக்காளர் அடையாள அட்டை, ஆதார் அல்லது ஓட்டுநர் உரிமம் மூலம் பயணம் செய்யலாம்' 
              : 'Indian citizens can travel to these countries with Voter ID, Aadhaar, or Driving License'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {noPassportCountries.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🇮🇳</span>
                  <h4 className="font-bold text-lg text-blue-900">{c.country}</h4>
                </div>
                <p className="text-sm text-gray-700 mb-1"><span className="font-medium">{language === 'tamil' ? 'தேவையான ஆவணங்கள்:' : 'Documents Required:'}</span></p>
                <p className="text-sm text-gray-600">{c.documents}</p>
                <p className="text-xs text-green-600 mt-2">{c.notes}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <Info className="w-4 h-4 inline mr-1" />
              {language === 'tamil' 
                ? 'குறிப்பு: பாஸ்போர்ட் இல்லாமல் பயணம் செய்ய முடிந்தாலும், சர்வதேச பயணத்திற்கு பாஸ்போர்ட் வைத்திருப்பது பரிந்துரைக்கப்படுகிறது.' 
                : 'Note: While travel without passport is possible, having a passport is recommended for international travel.'}
            </p>
          </div>
        </div>
      )}

      {/* Visa on Arrival */}
      {activeVisaTab === 'voa' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            {language === 'tamil' ? 'விசா ஆன் அரைவல் நாடுகள்' : 'Visa on Arrival Countries'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'tamil' 
              ? 'விமான நிலையத்தில் விசா பெற்றுக்கொள்ளக்கூடிய நாடுகள்' 
              : 'Countries where visa can be obtained at the airport'}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">{language === 'tamil' ? 'நாடு' : 'Country'}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">{language === 'tamil' ? 'கட்டணம்' : 'Fee'}</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">{language === 'tamil' ? 'காலம்' : 'Duration'}</th>
                </tr>
              </thead>
              <tbody>
                {visaOnArrivalCountries.map((c, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{c.country}</td>
                    <td className="px-4 py-2 text-green-600">{c.fee}</td>
                    <td className="px-4 py-2">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Passport Services */}
      {activeVisaTab === 'passport' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Contact className="w-5 h-5 mr-2 text-blue-600" />
            {language === 'tamil' ? 'பாஸ்போர்ட் சேவைகள் & கட்டணங்கள்' : 'Passport Services & Fees'}
          </h3>
          <div className="space-y-4">
            {passportServices.map((service, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600">{language === 'tamil' ? 'செயலாக்க நேரம்:' : 'Processing Time:'} {service.time}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="font-medium text-blue-700">{service.fee}</p>
                    <p className="text-sm text-orange-600">{language === 'tamil' ? 'த tatkal:' : 'Tatkal:'} {service.tatkal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Passport Seva Links */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-3">{language === 'tamil' ? 'பயனுள்ள இணைப்புகள்' : 'Useful Links'}</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href="https://www.passportindia.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-white border hover:border-blue-300 transition-all">
                <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm">{language === 'tamil' ? 'பாஸ்போர்ட் சேவா இணையதளம்' : 'Passport Seva Online'}</span>
              </a>
              <a href="https://www.passportindia.gov.in/AppOnlineProject/online/apptAvailStatus" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-white border hover:border-blue-300 transition-all">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                <span className="text-sm">{language === 'tamil' ? 'நியமனம் கிடைக்கும் நிலை' : 'Appointment Availability'}</span>
              </a>
              <a href="https://www.passportindia.gov.in/AppOnlineProject/online/trackApplication" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-white border hover:border-blue-300 transition-all">
                <Search className="w-5 h-5 mr-2 text-purple-600" />
                <span className="text-sm">{language === 'tamil' ? 'விண்ணப்ப நிலை' : 'Track Application'}</span>
              </a>
              <a href="https://portal2.passportindia.gov.in/AppOnlineProject/online/faq" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-lg bg-white border hover:border-blue-300 transition-all">
                <Info className="w-5 h-5 mr-2 text-orange-600" />
                <span className="text-sm">{language === 'tamil' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'FAQs'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Wrap with ProtectedRoute
const TransportPage = () => {
  return (
    <ProtectedRoute>
      <TransportPageContent />
    </ProtectedRoute>
  );
};

export default TransportPage;
