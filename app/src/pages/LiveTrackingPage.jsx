// LiveTrackingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, 
  MapPin, 
  Navigation, 
  Clock, 
  Gauge,
  Search,
  RefreshCw,
  AlertCircle,
  Phone,
  Info,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const LiveTrackingPage = () => {
  const { t, language } = useLanguage();
  const [busNumber, setBusNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const intervalRef = useRef(null);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('openway-recent-buses');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Simulate bus API data
  const simulateBusData = (busNum) => {
    const routes = [
      { from: 'Chennai', to: 'Coimbatore', stops: ['Chennai', 'Salem', 'Erode', 'Coimbatore'] },
      { from: 'Chennai', to: 'Madurai', stops: ['Chennai', 'Villupuram', 'Trichy', 'Madurai'] },
      { from: 'Chennai', to: 'Bangalore', stops: ['Chennai', 'Vellore', 'Krishnagiri', 'Hosur', 'Bangalore'] },
      { from: 'Coimbatore', to: 'Bangalore', stops: ['Coimbatore', 'Tiruppur', 'Erode', 'Salem', 'Bangalore'] },
    ];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    const currentStopIndex = Math.floor(Math.random() * (randomRoute.stops.length - 1));
    const progress = (currentStopIndex / (randomRoute.stops.length - 1)) * 100;

    return {
      busNumber: busNum,
      route: `${randomRoute.from} - ${randomRoute.to}`,
      currentLocation: randomRoute.stops[currentStopIndex],
      nextStop: randomRoute.stops[currentStopIndex + 1] || 'Destination',
      speed: Math.floor(Math.random() * 40) + 40,
      estimatedArrival: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 59)}m`,
      status: 'Running',
      lastUpdated: new Date().toLocaleTimeString(),
      progress,
      stops: randomRoute.stops,
      currentStopIndex,
      driverName: ['Ramesh','Kumar','Suresh','Rajesh','Mahesh'][Math.floor(Math.random()*5)],
      driverPhone: `+91 98765 ${Math.floor(Math.random()*89999)+10000}`,
      busType: ['Ultra Deluxe','Super Deluxe','Express','Ordinary'][Math.floor(Math.random()*4)],
      seatAvailability: Math.floor(Math.random()*20)+5
    };
  };

  // Start tracking
  const startTracking = async () => {
    if (!busNumber.trim()) {
      setError(language==='tamil' ? 'பேருந்து எண்ணை உள்ளிடவும்' : 'Please enter bus number');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate API call
      const data = simulateBusData(busNumber.toUpperCase());
      setBusData(data);
      setIsTracking(true);

      // Save recent searches
      const newSearch = { busNumber: busNumber.toUpperCase(), timestamp: new Date().toISOString() };
      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.busNumber !== busNumber.toUpperCase())].slice(0,5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('openway-recent-buses', JSON.stringify(updatedSearches));

      // Auto refresh every 30s
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setBusData(prev => ({
          ...prev,
          speed: Math.floor(Math.random() * 40) + 40,
          lastUpdated: new Date().toLocaleTimeString()
        }));
      }, 30000);

    } catch (err) {
      setError(language==='tamil' ? 'பேருந்து தகவலை பெற முடியவில்லை' : 'Unable to fetch bus information');
    } finally { setLoading(false); }
  };

  // Stop tracking
  const stopTracking = () => {
    setIsTracking(false);
    setBusData(null);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current=null; }
  };

  const refreshData = () => { if(busNumber) startTracking(); };

  useEffect(() => () => { if(intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-8" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
              <MapPin className="w-8 h-8 text-white"/>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{t('trackingTitle')}</h1>
            <p className="text-gray-600">{language==='tamil'?'தமிழ்நாடு அரசு பேருந்துகளின் நேரடி இருப்பிடத்தை கண்காணிக்கவும்':'Track live location of Tamil Nadu Government buses'}</p>
          </motion.div>

          {/* Search Box */}
          <motion.div className="bg-white rounded-2xl shadow-xl p-6 mb-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Bus className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input 
                  type="text" value={busNumber} onChange={e=>setBusNumber(e.target.value.toUpperCase())} 
                  placeholder={t('enterBusNumber')} className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg" 
                  disabled={isTracking} autoFocus={!isTracking} 
                  onKeyPress={e=>e.key==='Enter' && startTracking()} 
                />
              </div>
              {!isTracking ? (
                <button onClick={startTracking} disabled={loading} className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <><Search className="w-5 h-5"/><span>{t('trackNow')}</span></>}
                </button>
              ) : (
                <button onClick={stopTracking} className="px-8 py-4 rounded-xl bg-red-500 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <X className="w-5 h-5"/>
                  <span>{language==='tamil'?'நிறுத்து':'Stop'}</span>
                </button>
              )}
            </div>

            {error && <motion.div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}><AlertCircle className="w-5 h-5 mr-2"/>{error}</motion.div>}

            {!isTracking && recentSearches.length>0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">{language==='tamil'?'சமீபத்திய தேடல்கள்:':'Recent Searches:'}</p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search,index)=>(
                    <button key={index} onClick={()=>setBusNumber(search.busNumber)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">{search.busNumber}</button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Bus Data */}
          <AnimatePresence>
            {isTracking && busData && (
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}>
                {/* Status Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <Bus className="w-8 h-8 text-white"/>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{busData.busNumber}</h2>
                        <p className="text-gray-500">{busData.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                        <span className="font-medium">{busData.status}</span>
                      </div>
                      <button onClick={refreshData} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <RefreshCw className="w-5 h-5 text-gray-600"/>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>{busData.stops[0]}</span>
                      <span>{busData.stops[busData.stops.length-1]}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" initial={{width:0}} animate={{width:`${busData.progress}%`}} transition={{duration:1}}/>
                    </div>
                    <div className="flex justify-between mt-2">
                      {busData.stops.map((stop,index)=>(
                        <div key={index} className={`text-xs ${index<=busData.currentStopIndex?'text-blue-600 font-medium':'text-gray-400'}`}>
                          <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${index<=busData.currentStopIndex?'bg-blue-600':'bg-gray-300'}`}/>
                          {stop}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <motion.div className="bg-white rounded-xl shadow-lg p-4" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.1}}>
                    <MapPin className="w-8 h-8 text-blue-600 mb-2"/>
                    <p className="text-sm text-gray-500">{t('busLocation')}</p>
                    <p className="text-lg font-bold text-gray-900">{busData.currentLocation}</p>
                  </motion.div>

                  <motion.div className="bg-white rounded-xl shadow-lg p-4" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.2}}>
                    <Navigation className="w-8 h-8 text-green-600 mb-2"/>
                    <p className="text-sm text-gray-500">{t('nextStop')}</p>
                    <p className="text-lg font-bold text-gray-900">{busData.nextStop}</p>
                  </motion.div>

                  <motion.div className="bg-white rounded-xl shadow-lg p-4" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.3}}>
                    <Clock className="w-8 h-8 text-orange-600 mb-2"/>
                    <p className="text-sm text-gray-500">{t('estimatedArrival')}</p>
                    <p className="text-lg font-bold text-gray-900">{busData.estimatedArrival}</p>
                  </motion.div>

                  <motion.div className="bg-white rounded-xl shadow-lg p-4" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.4}}>
                    <Gauge className="w-8 h-8 text-purple-600 mb-2"/>
                    <p className="text-sm text-gray-500">{t('currentSpeed')}</p>
                    <p className="text-lg font-bold text-gray-900">{busData.speed} km/h</p>
                  </motion.div>
                </div>

                {/* Driver + Bus Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.5}}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{language==='tamil'?'பேருந்து தகவல்':'Bus Information'}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-500">{language==='tamil'?'பேருந்து வகை:':'Bus Type:'}</span><span className="font-medium">{busData.busType}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">{language==='tamil'?'இருக்கை கிடைக்கும்:':'Seat Availability:'}</span><span className="font-medium text-green-600">{busData.seatAvailability} {language==='tamil'?'இருக்கைகள்':'seats'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">{language==='tamil'?'கடைசி புதுப்பிப்பு:':'Last Updated:'}</span><span className="font-medium">{busData.lastUpdated}</span></div>
                    </div>
                  </motion.div>

                  <motion.div className="bg-white rounded-2xl shadow-lg p-6" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.6}}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{language==='tamil'?'ஓட்டுநர் தகவல்':'Driver Information'}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-500">{language==='tamil'?'பெயர்:':'Name:'}</span><span className="font-medium">{busData.driverName}</span></div>
                      <div className="flex justify-between items-center"><span className="text-gray-500">{language==='tamil'?'தொலைபேசி:':'Phone:'}</span><a href={`tel:${busData.driverPhone}`} className="flex items-center text-blue-600 hover:text-blue-700"><Phone className="w-4 h-4 mr-1"/>{busData.driverPhone}</a></div>
                    </div>
                  </motion.div>
                </div>

                {/* Info Note */}
                <motion.div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-start" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}>
                  <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5"/>
                  <p className="text-sm text-blue-700">{language==='tamil'?'தகவல்கள் 30 வினாடிகளுக்கு ஒருமுறை புதுப்பிக்கப்படுகின்றன. துல்லியமான தகவலுக்கு TNSTC அதிகாரப்பூர்வ வலைத்தளத்தை பார்வையிடவும்.':'Information is updated every 30 seconds. For accurate information, please visit the official TNSTC website.'}</p>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Sample Bus Numbers */}
          {!isTracking && (
            <motion.div className="mt-8" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{language==='tamil'?'மாதிரி பேருந்து எண்கள்':'Sample Bus Numbers'}</h3>
              <div className="flex flex-wrap gap-2">
                {['TN01AB1234','TN07CD5678','TN22EF9012','TN33GH3456','TN44IJ7890'].map((bus,index)=>(
                  <button key={index} onClick={()=>setBusNumber(bus)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors">{bus}</button>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;