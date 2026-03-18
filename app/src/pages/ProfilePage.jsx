import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Camera, Upload, X, Save, Calendar, Phone, Mail, MapPin, 
  CheckCircle, Sparkles, UserCircle, Users, Baby, Cat, Dog
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

// Extended Avatar options for all categories
const avatarOptions = {
  boys: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=boy1&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=boy2&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=boy3&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=boy4&gender=male',
  ],
  girls: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=girl1&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=girl2&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=girl3&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=girl4&gender=female',
  ],
  men: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=man1&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=man2&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=man3&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=man4&gender=male',
  ],
  women: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=woman1&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=woman2&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=woman3&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=woman4&gender=female',
  ],
  grandparents: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=grandpa1&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=grandpa2&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=grandma1&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=grandma2&gender=female',
  ],
  kids: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=kid1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=kid2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=kid3',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=kid4',
  ],
  animals: [
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=cat1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=dog1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=bear1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=rabbit1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=fox1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=panda1',
  ],
};

const ProfilePage = () => {
  const { language } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    address: user?.address || '',
    profileImage: user?.profileImage || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [activeAvatarTab, setActiveAvatarTab] = useState('boys');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const t = {
    tamil: {
      editProfile: 'உங்கள் சுயவிவரத்தைத் திருத்தவும்',
      manageInfo: 'உங்கள் தனிப்பட்ட தகவல்களை நிர்வகிக்கவும்',
      name: 'பெயர் *',
      phone: 'கைபேசி எண்',
      dob: 'பிறந்த தேதி',
      gender: 'பாலினம்',
      address: 'முகவரி',
      male: 'ஆண்',
      female: 'பெண்',
      transgender: 'திருநங்கை',
      preferNotToSay: 'கூற விரும்பவில்லை',
      saveChanges: 'மாற்றங்களை சேமிக்கவும்',
      saving: 'சேமிக்கிறது...',
      saved: 'சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!',
      chooseAvatar: 'அவதாரைத் தேர்வு செய்க',
      uploadPhoto: 'புகைப்படத்தை பதிவேற்றவும்',
      capturePhoto: 'புகைப்படத்தை பிடிக்கவும்',
      removePhoto: 'புகைப்படத்தை அகற்றவும்',
      boys: 'சிறுவர்கள்',
      girls: 'சிறுமிகள்',
      men: 'ஆண்கள்',
      women: 'பெண்கள்',
      grandparents: 'மூத்தோர்',
      kids: 'குழந்தைகள்',
      animals: 'விலங்குகள்',
      email: 'மின்னஞ்சல்',
      username: 'பயனர் பெயர்',
      cannotChange: 'மாற்ற முடியாது',
    },
    english: {
      editProfile: 'Edit Your Profile',
      manageInfo: 'Manage your personal information',
      name: 'Name *',
      phone: 'Phone Number',
      dob: 'Date of Birth',
      gender: 'Gender',
      address: 'Address',
      male: 'Male',
      female: 'Female',
      transgender: 'Transgender',
      preferNotToSay: 'Prefer not to say',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      saved: 'Profile saved successfully!',
      chooseAvatar: 'Choose an Avatar',
      uploadPhoto: 'Upload Photo',
      capturePhoto: 'Capture Photo',
      removePhoto: 'Remove Photo',
      boys: 'Boys',
      girls: 'Girls',
      men: 'Men',
      women: 'Women',
      grandparents: 'Grandparents',
      kids: 'Kids',
      animals: 'Animals',
      email: 'Email',
      username: 'Username',
      cannotChange: 'Cannot be changed',
    },
  }[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
        setSaveSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setFormData(prev => ({ ...prev, profileImage: avatarUrl }));
    setShowAvatarSelector(false);
    setSaveSuccess(false);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, profileImage: '' }));
    setSaveSuccess(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      alert(language === 'tamil' ? 'கேமராவை அணுக முடியவில்லை' : 'Could not access camera');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setFormData(prev => ({ ...prev, profileImage: imageData }));
      
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setShowCamera(false);
      setSaveSuccess(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setShowCamera(false);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert(language === 'tamil' ? 'பெயர் கட்டாயம் தேவை' : 'Name is required');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call to Spring Boot backend
    try {
      const response = await fetch(`http://localhost:8082/users/${user.username}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateProfile(formData);
        setSaveSuccess(true);
      }
    } catch (err) {
      // Fallback - save to localStorage
      updateProfile(formData);
      setSaveSuccess(true);
    }
    
    setIsSaving(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900">{t.editProfile}</h1>
          <p className="text-gray-600 mt-2">{t.manageInfo}</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div className="bg-white rounded-3xl shadow-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Image Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="relative inline-block">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                  <span className="text-white text-3xl font-bold">{getInitials(formData.name)}</span>
                </div>
              )}
              
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50" title={t.uploadPhoto}>
                  <Upload className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={startCamera} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50" title={t.capturePhoto}>
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={() => setShowAvatarSelector(true)} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50" title={t.chooseAvatar}>
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </button>
                {formData.profileImage && (
                  <button onClick={handleRemovePhoto} className="w-10 h-10 bg-red-100 rounded-full shadow-lg flex items-center justify-center hover:bg-red-200" title={t.removePhoto}>
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                )}
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Username - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserCircle className="w-4 h-4 inline mr-1" />
                  {t.username}
                </label>
                <input type="text" value={user?.username || ''} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500" />
                <p className="text-xs text-gray-400 mt-1">{t.cannotChange}</p>
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  {t.email}
                </label>
                <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500" />
                <p className="text-xs text-gray-400 mt-1">{t.cannotChange}</p>
              </div>

              {/* Name - Required */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder={language === 'tamil' ? 'உங்கள் பெயரை உள்ளிடவும்' : 'Enter your name'}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t.dob}
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Gender */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  {t.gender}
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'male', label: t.male, icon: User },
                    { value: 'female', label: t.female, icon: User },
                    { value: 'transgender', label: t.transgender, icon: User },
                    { value: 'prefer_not_to_say', label: t.preferNotToSay, icon: User },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all ${
                        formData.gender === option.value
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t.address}
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder={language === 'tamil' ? 'உங்கள் முகவரியை உள்ளிடவும்' : 'Enter your address'}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex items-center justify-between">
              {saveSuccess && (
                <motion.div className="flex items-center text-green-600" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>{t.saved}</span>
                </motion.div>
              )}
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="ml-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.saving}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{t.saveChanges}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Avatar Selector Modal */}
        <AnimatePresence>
          {showAvatarSelector && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAvatarSelector(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.chooseAvatar}</h3>
                
                {/* Avatar Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { id: 'boys', label: t.boys },
                    { id: 'girls', label: t.girls },
                    { id: 'men', label: t.men },
                    { id: 'women', label: t.women },
                    { id: 'grandparents', label: t.grandparents },
                    { id: 'kids', label: t.kids },
                    { id: 'animals', label: t.animals },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAvatarTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        activeAvatarTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {avatarOptions[activeAvatarTab]?.map((avatar, idx) => (
                    <button key={idx} onClick={() => handleAvatarSelect(avatar)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                      <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-auto rounded-lg" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera Modal */}
        <AnimatePresence>
          {showCamera && (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white rounded-2xl p-6 max-w-md w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{t.capturePhoto}</h3>
                  <button onClick={stopCamera} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl" />
                <canvas ref={canvasRef} className="hidden" />
                <button onClick={capturePhoto} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold">
                  {language === 'tamil' ? 'புகைப்படத்தை பிடிக்கவும்' : 'Capture Photo'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
