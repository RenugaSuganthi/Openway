import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Utensils, Stethoscope, ShoppingCart, HeadphonesIcon, Heart,
  ArrowRight, CheckCircle, AlertCircle, Send, User, Mail, Phone,
  MapPin, FileText, Shield, Clock, Users, Info, Upload, DollarSign, FileUp,
  MessageCircle, Check, XCircle, Building2, UserCircle, BookOpen, Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import { submitSupportRequest, getAllRequests, updateRequestStatus } from '../api/support';

const SupportPageContent = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [showHelpRequests, setShowHelpRequests] = useState(false);
  const [helpRequests, setHelpRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('new');

  // Form data for different help types
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    category: '',
    details: '',
    urgency: 'normal',
    // School fees specific
    schoolName: '',
    studentName: '',
    parentName: '',
    studentClass: '',
    feeAmount: '',
    schoolAccountNumber: '',
    // Documents
    documents: [],
    // GPay for direct help
    gpayNumber: '',
    upiId: '',
  });

  const navLinks = [
    { name: t('home'), href: '#/' },
    { name: t('complaint'), href: '#/complaint' },
    { name: t('transport'), href: '#/transport' },
    { name: t('liveTracking'), href: '#/tracking' },
    { name: t('support'), href: '#/support' },
  ];

  // Load help requests from localStorage
  useEffect(() => {
  const loadRequests = async () => {
    try {
      const allRequests = await getAllRequests();
      setHelpRequests(allRequests.filter(r => r.status !== 'rejected' && r.requesterPhone !== user?.phone));
      setMyRequests(allRequests.filter(r => r.requesterPhone === user?.phone));
    } catch (err) {
      console.error('Error loading requests:', err);
    }
  };

  loadRequests();
}, [user?.phone]);

  const supportCategories = [
    {
      id: 'schoolFees',
      icon: GraduationCap,
      title: t('schoolFees'),
      titleTamil: 'பள்ளி கட்டணம்',
      description: t('schoolFeesDesc'),
      descriptionTamil: 'கல்வி உதவித்தொகை மற்றும் கட்டண ஆதரவு',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      requiresDocuments: true,
      fields: [
        { name: 'schoolName', label: 'School Name', labelTamil: 'பள்ளி பெயர்', required: true },
        { name: 'studentName', label: 'Student Name', labelTamil: 'மாணவர் பெயர்', required: true },
        { name: 'parentName', label: 'Parent/Guardian Name', labelTamil: 'பெற்றோர்/பாதுகாவலர் பெயர்', required: true },
        { name: 'studentClass', label: 'Class', labelTamil: 'வகுப்பு', required: true },
        { name: 'feeAmount', label: 'Fee Amount (₹)', labelTamil: 'கட்டணத் தொகை (₹)', required: true, type: 'number' },
        { name: 'schoolAccountNumber', label: 'School Account Number', labelTamil: 'பள்ளி கணக்கு எண்', required: true },
      ]
    },
    {
      id: 'foodSupport',
      icon: Utensils,
      title: t('foodSupport'),
      titleTamil: 'உணவு ஆதரவு',
      description: t('foodSupportDesc'),
      descriptionTamil: 'உணவு பொருட்கள் மற்றும் அத்தியாவசியங்கள்',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      requiresDocuments: false,
      fields: [
        { name: 'familyMembers', label: 'Number of Family Members', labelTamil: 'குடும்ப உறுப்பினர்கள் எண்ணிக்கை', required: true, type: 'number' },
        { name: 'gpayNumber', label: 'GPay/PhonePe Number', labelTamil: 'GPay/PhonePe எண்', required: false },
        { name: 'upiId', label: 'UPI ID', labelTamil: 'UPI ID', required: false },
      ]
    },
    {
      id: 'medicalSupport',
      icon: Stethoscope,
      title: t('medicalSupport'),
      titleTamil: 'மருத்துவ ஆதரவு',
      description: t('medicalSupportDesc'),
      descriptionTamil: 'மருத்துவ செலவுகள் மற்றும் சிகிச்சை உதவி',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      requiresDocuments: true,
      fields: [
        { name: 'patientName', label: 'Patient Name', labelTamil: 'நோயாளி பெயர்', required: true },
        { name: 'hospitalName', label: 'Hospital Name', labelTamil: 'மருத்துவமனை பெயர்', required: true },
        { name: 'treatmentType', label: 'Treatment Required', labelTamil: 'தேவையான சிகிச்சை', required: true },
        { name: 'estimatedCost', label: 'Estimated Cost (₹)', labelTamil: 'மதிப்பிடப்பட்ட செலவு (₹)', required: true, type: 'number' },
        { name: 'gpayNumber', label: 'GPay/PhonePe Number', labelTamil: 'GPay/PhonePe எண்', required: false },
        { name: 'upiId', label: 'UPI ID', labelTamil: 'UPI ID', required: false },
      ]
    },
    {
      id: 'groceries',
      icon: ShoppingCart,
      title: t('groceries'),
      titleTamil: 'மளிகை பொருட்கள்',
      description: t('groceriesDesc'),
      descriptionTamil: 'தினசரி மளிகை பொருட்கள் ஆதரவு',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      requiresDocuments: false,
      fields: [
        { name: 'familyMembers', label: 'Number of Family Members', labelTamil: 'குடும்ப உறுப்பினர்கள் எண்ணிக்கை', required: true, type: 'number' },
        { name: 'monthlyIncome', label: 'Monthly Income (₹)', labelTamil: 'மாதாந்திர வருமானம் (₹)', required: true, type: 'number' },
        { name: 'gpayNumber', label: 'GPay/PhonePe Number', labelTamil: 'GPay/PhonePe எண்', required: false },
        { name: 'upiId', label: 'UPI ID', labelTamil: 'UPI ID', required: false },
      ]
    },
    {
      id: 'counseling',
      icon: HeadphonesIcon,
      title: t('counseling'),
      titleTamil: 'ஆலோசனை',
      description: t('counselingDesc'),
      descriptionTamil: 'மனநலம் மற்றும் வழிகாட்டு ஆலோசனை',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      requiresDocuments: false,
      isAnonymous: true,
      fields: [
        { name: 'problemType', label: 'Type of Problem', labelTamil: 'பிரச்சனை வகை', required: true },
        { name: 'preferredTime', label: 'Preferred Contact Time', labelTamil: 'விருப்பமான தொடர்பு நேரம்', required: false },
      ]
    }
  ];

  const handleCategorySelect = (categoryId) => {
    const category = supportCategories.find(c => c.id === categoryId);
    setActiveCategory(categoryId);
    setFormData(prev => ({ 
      ...prev, 
      category: categoryId,
      // Reset category-specific fields
      schoolName: '',
      studentName: '',
      parentName: '',
      studentClass: '',
      feeAmount: '',
      schoolAccountNumber: '',
      documents: [],
    }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...fileData] }));
  };

  const generateTrackingId = () => {
    return `HELP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const newTrackingId = generateTrackingId();
  setTrackingId(newTrackingId);

  const category = supportCategories.find(c => c.id === formData.category);

  const requestData = {
    ...formData,
    trackingId: newTrackingId,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    requesterName: user?.name,
    requesterPhone: user?.phone,
    requesterEmail: user?.email,
    categoryName: category?.title,
    responses: [],
  };

  try {
    const savedRequest = await submitSupportRequest(requestData);

    // Update frontend state
    setHelpRequests(prev => [...prev, savedRequest]);
    setMyRequests(prev => [...prev, savedRequest]);

    addNotification({
      title: language === 'tamil' ? 'புதிய உதவி கோரிக்கை' : 'New Help Request',
      message: `${category?.title} - ${formData.name || user?.name} needs help`,
      type: 'help_request',
      trackingId: newTrackingId,
      senderPhone: user?.phone,
    });

    setSubmitSuccess(true);
  } catch (err) {
    console.error(err);
    alert('Failed to submit request.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleAcceptRequest = async (request) => {
  const message = prompt(language === 'tamil' ? 'செய்தியை உள்ளிடவும்:' : 'Enter your message:');
  if (!message) return;

  try {
    const updated = await updateRequestStatus(request.trackingId, 'accepted', user?.name, user?.phone);

    // Add message to responses locally
    updated.responses = [...(request.responses || []), { from: user?.name, message, time: new Date().toISOString() }];

    setHelpRequests(prev => prev.map(r => r.trackingId === updated.trackingId ? updated : r));
  } catch (err) {
    console.error(err);
    alert('Failed to accept request');
  }
};

const handleRejectRequest = async (request) => {
  try {
    const updated = await updateRequestStatus(request.trackingId, 'rejected');
    setHelpRequests(prev => prev.filter(r => r.trackingId !== request.trackingId));
  } catch (err) {
    console.error(err);
    alert('Failed to reject request');
  }
};

  
  // Generate monthly report
  const generateReport = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const monthlyRequests = helpRequests.filter(r => new Date(r.submittedAt) >= oneMonthAgo);
    
    const report = {
      period: `${oneMonthAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
      totalRequests: monthlyRequests.length,
      byCategory: {},
      totalAmount: 0,
    };

    monthlyRequests.forEach(r => {
      report.byCategory[r.category] = (report.byCategory[r.category] || 0) + 1;
      if (r.feeAmount) report.totalAmount += parseFloat(r.feeAmount);
      if (r.estimatedCost) report.totalAmount += parseFloat(r.estimatedCost);
    });

    alert(JSON.stringify(report, null, 2));
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 pb-12 px-4">
        <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
            <motion.div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{language === 'tamil' ? 'கோரிக்கை பெறப்பட்டது!' : 'Request Received!'}</h2>
            <p className="text-gray-600 mb-8">{language === 'tamil' ? 'உங்கள் கோரிக்கை வெற்றிகரமாக பதிவு செய்யப்பட்டது.' : 'Your request has been successfully registered.'}</p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">{language === 'tamil' ? 'கண்காணிப்பு எண்:' : 'Tracking ID:'}</p>
              <p className="text-3xl font-bold text-blue-700 tracking-wider">{trackingId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => { setSubmitSuccess(false); setShowForm(false); setActiveCategory(null); }} className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold">{language === 'tamil' ? 'மற்றொரு கோரிக்கை' : 'Another Request'}</button>
              <a href="#/" className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">{t('home')}</a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Help Requests Modal */}
          {showHelpRequests && (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowHelpRequests(false)}>
              <motion.div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{language === 'tamil' ? 'உதவி கோரிக்கைகள்' : 'Help Requests'}</h3>
                  <div className="flex gap-2">
                    <button onClick={generateReport} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">{language === 'tamil' ? 'அறிக்கை' : 'Report'}</button>
                    <button onClick={() => setShowHelpRequests(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{language === 'tamil' ? 'அனைத்தும்' : 'All'}</button>
                  <button onClick={() => setActiveTab('my')} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'my' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{language === 'tamil' ? 'எனது கோரிக்கைகள்' : 'My Requests'}</button>
                </div>

                <div className="space-y-3">
                  {(activeTab === 'my' ? myRequests : helpRequests).map((request) => (
                    <div key={request.trackingId} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{request.categoryName}</p>
                          <p className="text-sm text-gray-500">{request.name || request.requesterName}</p>
                          <p className="text-xs text-gray-400">{new Date(request.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          {request.status === 'pending' && request.requesterPhone !== user?.phone && (
                            <>
                              <button onClick={() => handleAcceptRequest(request)} className="p-2 bg-green-100 text-green-700 rounded-lg"><Check className="w-4 h-4" /></button>
                              <button onClick={() => handleRejectRequest(request)} className="p-2 bg-red-100 text-red-700 rounded-lg"><XCircle className="w-4 h-4" /></button>
                            </>
                          )}
                          {request.status === 'accepted' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{language === 'tamil' ? 'ஏற்கப்பட்டது' : 'Accepted'}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Header */}
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{t('supportTitle')}</h1>
            <p className="text-gray-600">{t('supportSubtitle')}</p>
          </motion.div>

          {/* Categories or Form */}
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {supportCategories.map((category, index) => (
                    <motion.div key={category.id} className="group cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => handleCategorySelect(category.id)} whileHover={{ y: -5 }}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                        <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                        <div className="p-6">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <category.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{category.title}</h3>
                          <p className="text-sm text-gray-500 mb-3">{category.titleTamil}</p>
                          <p className="text-sm text-gray-600">{category.description}</p>
                          {category.requiresDocuments && (
                            <p className="text-xs text-orange-600 mt-2 flex items-center"><FileUp className="w-3 h-3 mr-1" />{language === 'tamil' ? 'ஆவணங்கள் தேவை' : 'Documents Required'}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <button onClick={() => setShowForm(false)} className="mb-6 flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowRight className="w-5 h-5 mr-1 rotate-180" />
                  <span>{language === 'tamil' ? 'பின் செல்லு' : 'Go Back'}</span>
                </button>

                {activeCategory && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    {supportCategories.map(cat => cat.id === activeCategory && (
                      <div key={cat.id}>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                            <cat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                            <p className="text-gray-500">{cat.titleTamil}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Support Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">{language === 'tamil' ? 'உதவி கோரிக்கை படிவம்' : 'Support Request Form'}</h3>

                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><User className="w-4 h-4 inline mr-1" />{t('yourName')} *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><Phone className="w-4 h-4 inline mr-1" />{t('phone')}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200" />
                    </div>
                  </div>

                  {/* Category-specific fields */}
                  {activeCategory && supportCategories.find(c => c.id === activeCategory)?.fields.map((field) => (
                    <div key={field.name} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'tamil' ? field.labelTamil : field.label}
                        {field.required && ' *'}
                      </label>
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  ))}

                  {/* Document Upload */}
                  {activeCategory && supportCategories.find(c => c.id === activeCategory)?.requiresDocuments && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2"><Upload className="w-4 h-4 inline mr-1" />{language === 'tamil' ? 'ஆவணங்களை பதிவேற்றவும்' : 'Upload Documents'}</label>
                      <input type="file" multiple onChange={handleFileUpload} className="w-full" />
                      {formData.documents.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">{formData.documents.length} {language === 'tamil' ? 'ஆவணங்கள் தேர்வு செய்யப்பட்டன' : 'documents selected'}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2"><FileText className="w-4 h-4 inline mr-1" />{language === 'tamil' ? 'விவரங்கள்' : 'Details'} *</label>
                    <textarea name="details" value={formData.details} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none" />
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2">
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-5 h-5" /><span>{t('requestHelp')}</span></>}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SupportPage = () => (
  <ProtectedRoute>
    <SupportPageContent />
  </ProtectedRoute>
);

export default SupportPage;
