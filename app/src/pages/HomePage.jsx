import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bus, Train, Plane, Ship, MapPin, Phone, Mail, Shield, Users, Clock,
  AlertCircle, Heart, GraduationCap, Stethoscope, ShoppingCart, Utensils,
  HeadphonesIcon, ArrowRight, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { t, language } = useLanguage();

  const fadeInUp = { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
  const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };

  const features = [
    { icon: MapPin, title: t('realTimeTracking'), description: t('realTimeTrackingDesc'), color: 'from-blue-500 to-cyan-500', link: '#/tracking' },
    { icon: AlertCircle, title: t('complaintManagement'), description: t('complaintManagementDesc'), color: 'from-orange-500 to-red-500', link: '#/complaint' },
    { icon: Heart, title: t('anonymousSupport'), description: t('anonymousSupportDesc'), color: 'from-green-500 to-emerald-500', link: '#/support' }
  ];

  const quickStats = [
    { label: language === 'tamil' ? 'பேருந்துகள்' : 'Buses', value: '21,000+', icon: Bus },
    { label: language === 'tamil' ? 'பயணிகள்' : 'Passengers', value: '2M+', icon: Users },
    { label: language === 'tamil' ? 'வழித்தடங்கள்' : 'Routes', value: '3,500+', icon: MapPin },
    { label: language === 'tamil' ? 'புகார்கள் தீர்வு' : 'Resolved', value: '95%', icon: Shield },
  ];

  const services = [
    { icon: Bus, title: t('busService'), desc: t('busServiceDesc'), color: 'bg-blue-500' },
    { icon: Train, title: t('trainService'), desc: t('trainServiceDesc'), color: 'bg-green-500' },
    { icon: Plane, title: t('flightService'), desc: t('flightServiceDesc'), color: 'bg-purple-500' },
    { icon: Ship, title: t('shipService'), desc: t('shipServiceDesc'), color: 'bg-cyan-500' },
  ];

  const supportCategories = [
    { icon: GraduationCap, title: t('schoolFees'), desc: t('schoolFeesDesc'), color: 'from-blue-400 to-blue-600' },
    { icon: Utensils, title: t('foodSupport'), desc: t('foodSupportDesc'), color: 'from-orange-400 to-orange-600' },
    { icon: Stethoscope, title: t('medicalSupport'), desc: t('medicalSupportDesc'), color: 'from-red-400 to-red-600' },
    { icon: ShoppingCart, title: t('groceries'), desc: t('groceriesDesc'), color: 'from-green-400 to-green-600' },
    { icon: HeadphonesIcon, title: t('counseling'), desc: t('counselingDesc'), color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Hero Section */}
      <section id="home" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{language === 'tamil' ? 'நேரடி சேவைகள் கிடைக்கின்றன' : 'Live Services Available'}</span>
              </motion.div>

              <motion.h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                {t('welcome')}
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mt-2">{t('tagline')}</span>
              </motion.h1>

              <motion.p className="text-lg text-gray-600 mb-8 leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
                {t('description')}
              </motion.p>

              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
                <a href="#/tracking" className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all">
                  <span>{t('exploreServices')}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#/support" className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-200">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>{t('getSupport')}</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{t('dashboard')}</h3>
                    <p className="text-sm text-gray-500">{language === 'tamil' ? 'இன்றைய சுருக்கம்' : "Today's Summary"}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">{language === 'tamil' ? 'ஆன்லைன்' : 'Online'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {quickStats.map((stat, index) => (
                    <motion.div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.1 }} whileHover={{ scale: 1.02 }}>
                      <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">{t('quickLinks')}</p>
                  <div className="grid grid-cols-3 gap-3">
                    <a href="#/tracking" className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                      <MapPin className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="text-xs text-gray-700 text-center">{t('trackBus')}</span>
                    </a>
                    <a href="#/complaint" className="flex flex-col items-center p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
                      <AlertCircle className="w-6 h-6 text-orange-600 mb-1" />
                      <span className="text-xs text-gray-700 text-center">{t('fileComplaint')}</span>
                    </a>
                    <a href="#/support" className="flex flex-col items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                      <Heart className="w-6 h-6 text-green-600 mb-1" />
                      <span className="text-xs text-gray-700 text-center">{t('getSupport')}</span>
                    </a>
                  </div>
                </div>
              </div>

              <motion.div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg" animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <Clock className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('features')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full" />
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {features.map((feature, index) => (
              <motion.a key={index} href={feature.link} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden" variants={fadeInUp} whileHover={{ y: -10 }}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{language === 'tamil' ? 'மேலும் அறிய' : 'Learn More'}</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Transport Services Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('transportTitle')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">{language === 'tamil' ? 'அனைத்து போக்குவரத்து சேவைகளையும் ஒரே இடத்தில் கண்டறியுங்கள்' : 'Discover all transportation services in one place'}</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {services.map((service, index) => (
              <motion.a key={index} href="#/transport" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300" variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('supportTitle')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">{t('supportSubtitle')}</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {supportCategories.map((category, index) => (
              <motion.a key={index} href="#/support" className="group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all" variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
                <div className="relative z-10">
                  <category.icon className="w-10 h-10 mb-4 opacity-90" />
                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">OpenWay</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">{language === 'tamil' ? 'தமிழ்நாடு அரசு சேவைகளின் ஒருங்கிணைந்த மையம்.' : 'Unified portal for Tamil Nadu Government services.'}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{language === 'tamil' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}</h4>
              <ul className="space-y-2">
                <li><a href="#/tracking" className="text-gray-400 hover:text-white transition-colors">{t('liveTracking')}</a></li>
                <li><a href="#/complaint" className="text-gray-400 hover:text-white transition-colors">{t('complaint')}</a></li>
                <li><a href="#/transport" className="text-gray-400 hover:text-white transition-colors">{t('transport')}</a></li>
                <li><a href="#/support" className="text-gray-400 hover:text-white transition-colors">{t('support')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contactUs')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>1800-425-1000</span></li>
                <li className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>support@openway.tn.gov.in</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 OpenWay. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
