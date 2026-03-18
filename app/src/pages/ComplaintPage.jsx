import React, { useState } from "react";
import { 
  Bus, Train, Plane, Ship, MapPin, Phone, Mail, Shield, Users, Clock,
  AlertCircle, Heart, GraduationCap, Stethoscope, ShoppingCart, Utensils,
  HeadphonesIcon, ArrowRight, ChevronRight
} from 'lucide-react';
import Navbar from "@/components/Navbar";
import { useLanguage } from '../context/LanguageContext';


const ComplaintPage = () => {
  const [formData, setFormData] = useState({
    name: "Renuga",
    email: "lakshitharenuga@gmail.com",
    phone: "",
    complaintType: "busDelay",
    busNumber: "",
    route: "",
    details: ""
  });
  const { t, language, toggleLanguage } = useLanguage();
  const [aiEmail, setAiEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const complaintTypeTamil = {
    busDelay: "பேருந்து தாமதம்",
    overcrowding: "கூடுதல் மக்கள்",
    infrastructure: "அமைப்புச் சிக்கல்",
    behavior: "நடத்தை சிக்கல்",
    other: "மற்றவை"
  };

  const officerEmails = {
    busDelay: "commercial@tnstc.org",
    overcrowding: "cmcell@tn.gov.in",
    infrastructure: "tnstcbemd@gmail.com",
    behavior: "cmcell@tn.gov.in",
    other: "commercial@tnstc.org"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getOfficerEmail = (type) => {
    return officerEmails[type] || "support.tnstc@tn.gov.in";
  };

  const handlePreviewEmail = () => {
    const officerEmail = getOfficerEmail(formData.complaintType);
    const date = new Date().toLocaleDateString();
    const complaintLabelTA = complaintTypeTamil[formData.complaintType];

    // English Email
    const emailContentEN = `
Subject: Complaint Regarding ${formData.complaintType}

Dear Officer,

I would like to report an issue regarding Tamil Nadu State Transport Corporation services.

Complaint Details:
• Type: ${formData.complaintType}
• Bus Number: ${formData.busNumber || "Not specified"}
• Route: ${formData.route || "Not specified"}
• Date of Incident: ${date}

Description:
I experienced a problem related to ${formData.complaintType}. The bus service on the route ${formData.route} caused inconvenience to passengers. I kindly request the department to investigate this issue and take necessary action.
${formData.details}

I request immediate attention and resolution for this matter.
Thank you for your attention.
Sincerely,
${formData.name}
Phone: ${formData.phone || "N/A"}
Email: ${formData.email}

---
Sent via OpenWay Portal
To: ${officerEmail}
`;

    // Tamil Email
    const emailContentTA = `
பொருள்: ${complaintLabelTA} குறித்த புகார்

அன்பார்ந்த அதிகாரி அவர்களுக்கு,

தமிழ்நாடு அரசு போக்குவரத்து கழக சேவையில் ஏற்பட்ட சிக்கலை உங்கள் கவனத்திற்கு கொண்டு வருகிறேன்.

புகார் விவரங்கள்:
• வகை: ${complaintLabelTA}
• பேருந்து எண்: ${formData.busNumber || "குறிப்பிடப்படவில்லை"}
• வழி: ${formData.route || "குறிப்பிடப்படவில்லை"}
• நிகழ்வு தேதி: ${date}

விளக்கம்:

நான் ${complaintLabelTA} தொடர்பான சிக்கலை அனுபவித்தேன். ${formData.route} வழியில் பேருந்து சேவை காரணமாக பயணிகளுக்கு சிக்கல் ஏற்பட்டது. தயவுசெய்து இந்த விஷயத்தை ஆராய்ந்து, தேவையான நடவடிக்கை எடுக்குமாறு கோருகிறேன்.
${formData.details}

இந்த விஷயத்திற்கு உடனடியாக கவனம் செலுத்தி தீர்வு காணுமாறு கோருகிறேன்.

மிகவும் அன்புடன்,
${formData.name}
தொலைபேசி: ${formData.phone || "தகவல் இல்லை"}
மின்னஞ்சல்: ${formData.email}

---
OpenWay போர்டல் மூலம் அனுப்பப்பட்டது
To: ${officerEmail}
`;

    setAiEmail(language === "tamil" ? emailContentTA : emailContentEN);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8082/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    alert(
      language === "english"
        ? "Complaint submitted successfully!"
        : "புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!"
    );

    console.log("Saved Complaint:", data);

  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting complaint");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navbar */}
      <Navbar/>

      {/* Main Form */}
      <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {language === "tamil" ? "புகார் சமர்ப்பிக்கவும்" : "File a Complaint"}
          </h1>
          <p className="text-gray-600">
            {language === "tamil" ? "உங்கள் புகார்களை நேரடியாக அதிகாரிகளுக்கு அனுப்பவும்" : "Send your complaints directly to officials"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "உங்கள் பெயர் *" : "Your Name *"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === "tamil" ? "உங்கள் பெயர்" : "Your name"}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "தொலைபேசி எண்" : "Phone Number"}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Complaint Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "புகார் வகை *" : "Complaint Type *"}
              </label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                {Object.keys(complaintTypeTamil).map((type) => (
                  <option key={type} value={type}>
                    {language === "tamil" ? complaintTypeTamil[type] : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bus Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "பேருந்து எண்" : "Bus Number"}
              </label>
              <input
                type="text"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
                placeholder="TN-01-AB-1234"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Route */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "வழி" : "Route"}
              </label>
              <input
                type="text"
                name="route"
                value={formData.route}
                onChange={handleChange}
                placeholder={language === "tamil" ? "சென்னை - கோயம்புத்தூர்" : "Chennai - Coimbatore"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Details */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === "tamil" ? "புகார் விவரங்கள் *" : "Complaint Details *"}
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder={language === "tamil" ? "உங்கள் புகாரை விரிவாக குறிப்பிடவும்..." : "Describe your complaint in detail..."}
            ></textarea>
          </div>

          {/* AI Preview Button */}
          <button type="button" onClick={handlePreviewEmail} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
            {language === "tamil" ? "AI மின்னஞ்சல் முன்விபரிப்பு" : "Preview AI Email"}
          </button>

          {/* AI Email Display */}
          {aiEmail && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {language === "tamil" ? "AI உருவாக்கிய மின்னஞ்சல்:" : "AI-Generated Email:"}
              </p>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-40 overflow-y-auto">{aiEmail}</pre>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
              {language === "tamil" ? "புகார் சமர்ப்பிக்கவும்" : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;