import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  Bus,
  Clock,
  User,
  ShieldAlert,
  Phone,
  Mail,
  Send,
  FileText,
  MapPin,
  Sparkles,
  ChevronRight,
  ExternalLink,
  MessageSquareWarning,
  BadgeAlert,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const ComplaintPage = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "Renuga",
    email: "lakshitharenuga@gmail.com",
    phone: "",
    complaintType: "busDelay",

    busNumber: "",
    route: "",
    details: "",

    delayDuration: "",
    expectedTime: "",

    staffName: "",
    behaviorDetails: "",

    incidentLocation: "",
    safetyIssue: "",

    ticketNumber: "",
    travelDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiEmail, setAiEmail] = useState("");

  const complaintTypes = {
    busDelay: {
      labelEN: "Bus Delay",
      labelTA: "பேருந்து தாமதம்",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },

    overcrowding: {
      labelEN: "Overcrowding",
      labelTA: "அதிக நெரிசல்",
      icon: UsersIcon,
      color: "from-pink-500 to-rose-500",
    },

    behavior: {
      labelEN: "Staff Behavior",
      labelTA: "ஊழியர் நடத்தை",
      icon: User,
      color: "from-purple-500 to-indigo-500",
    },

    womenSafety: {
      labelEN: "Women Safety",
      labelTA: "பெண்கள் பாதுகாப்பு",
      icon: ShieldAlert,
      color: "from-red-500 to-pink-500",
    },

    infrastructure: {
      labelEN: "Infrastructure",
      labelTA: "அமைப்பு சிக்கல்",
      icon: Bus,
      color: "from-blue-500 to-cyan-500",
    },

    ticketIssue: {
      labelEN: "Ticket Issue",
      labelTA: "டிக்கெட் சிக்கல்",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
    },

    other: {
      labelEN: "Other",
      labelTA: "மற்றவை",
      icon: MessageSquareWarning,
      color: "from-gray-500 to-slate-600",
    },
  };

  const officerData = {
  busDelay: {
    title: "Bus Delay & Operational Issues",
    email: "ptcsotrs@gmail.com",
    phone: "18005991500",
    tollFree: "149",
    whatsapp: "9445014448",
    website: "https://tnstc.in",
  },

  overcrowding: {
    title: "Bus Overcrowding & Route Frequency",
    email: "cmcell@tn.gov.in",
    phone: "1100",
    tollFree: "1100",
    whatsapp: "",
    website: "https://tnega.org",
  },

  behavior: {
    title: "Staff Behavior & Public Nuisance",
    email: "commercial@tnstc.org",
    phone: "18005991500", // Fixed missing 5 typo
    tollFree: "149",
    whatsapp: "9445014448",
    website: "https://tn.gov.in",
  },

  womenSafety: {
    title: "Women Safety & Security Emergencies",
    email: "cmcell@tn.gov.in",
    phone: "112", // Pan-India Emergency line
    tollFree: "1091", // State Women Helpline
    whatsapp: "",
    website: "https://ncw.gov.in",
  },

  infrastructure: {
    title: "Bus Stand, Depot & Infrastructure Facilities",
    email: "transport@tn.gov.in",
    phone: "04428520682",
    tollFree: "",
    whatsapp: "",
    website: "https://tn.gov.in",
  },

  ticketIssue: {
    title: "Ticket Booking & Refund Failures",
    email: "commercial@tnstc.org",
    phone: "9513948001", // Direct OTRS reservation support
    tollFree: "149",
    whatsapp: "9445014448",
    website: "https://tnstc.in",
  },

  other: {
    title: "Other Unresolved Grievances",
    email: "cmcell@tn.gov.in",
    phone: "1100",
    tollFree: "1100",
    whatsapp: "",
    website: "https://tnega.org",
  },
};


  const currentOfficer = useMemo(() => {
    return officerData[formData.complaintType];
  }, [formData.complaintType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateEmailTemplate = () => {
    const date = new Date().toLocaleDateString();

    const type =
      language === "tamil"
        ? complaintTypes[formData.complaintType].labelTA
        : complaintTypes[formData.complaintType].labelEN;

    let template = "";

    switch (formData.complaintType) {
      case "busDelay":
        template = `
Subject: Complaint Regarding Bus Delay

Respected Sir/Madam,

I would like to report a delay in TNSTC bus services.

Bus Number: ${formData.busNumber}
Route: ${formData.route}
Expected Time: ${formData.expectedTime}
Delay Duration: ${formData.delayDuration}
Date: ${date}

The delay caused inconvenience to passengers. Kindly investigate and take necessary action.

Complaint Details:
${formData.details}

Sincerely,
${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

To:
${currentOfficer.email}
`;
        break;

      case "behavior":
        template = `
Subject: Complaint Against Staff Behavior

Respected Officer,

I would like to report inappropriate behavior by transport staff.

Staff Name: ${formData.staffName}
Bus Number: ${formData.busNumber}
Route: ${formData.route}
Date: ${date}

Issue:
${formData.behaviorDetails}

Additional Details:
${formData.details}

Please take disciplinary action.

Regards,
${formData.name}

To:
${currentOfficer.email}
`;
        break;

      case "womenSafety":
        template = `
Subject: Women Safety Complaint

Dear Sir/Madam,

I wish to report a women safety concern during bus travel.

Location: ${formData.incidentLocation}
Bus Number: ${formData.busNumber}
Route: ${formData.route}

Issue:
${formData.safetyIssue}

Additional Details:
${formData.details}

Kindly take immediate action.

Regards,
${formData.name}

To:
${currentOfficer.email}
`;
        break;

      default:
        template = `
Subject: Transport Complaint

Respected Officer,

I would like to raise a complaint regarding transport services.

Complaint Type: ${type}
Bus Number: ${formData.busNumber}
Route: ${formData.route}

Details:
${formData.details}

Kindly resolve the issue.

Regards,
${formData.name}

To:
${currentOfficer.email}
`;
    }

    setAiEmail(template);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    // Save complaint in database
    const response = await fetch(
      "http://localhost:8082/complaints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save complaint");
    }

    // Generate email content
    const officer = officerData[formData.complaintType];

    const subject = encodeURIComponent(
      `Transport Complaint - ${formData.complaintType}`
    );

    const body = encodeURIComponent(`
Name: ${formData.name}

Phone: ${formData.phone}

Bus Number: ${formData.busNumber}

Route: ${formData.route}

Complaint Details:
${formData.details}
    `);

    // Open default mail app
    window.location.href = `mailto:${officer.email}?subject=${subject}&body=${body}`;

    alert("Complaint submitted successfully!");

    setLoading(false);

  } catch (error) {
    console.error(error);

    setLoading(false);

    alert("Error submitting complaint");
  }
};

  const ActiveIcon =
    complaintTypes[formData.complaintType].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
      <Navbar />

      {/* Floating Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white shadow-lg rounded-full px-6 py-3 mb-6 animate-bounce">
              <Sparkles className="text-orange-500" />
              <span className="font-semibold">
                {language === "tamil"
                  ? "தமிழ்நாடு போக்குவரத்து புகார் மையம்"
                  : "Tamil Nadu Transport Complaint Portal"}
              </span>
            </div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {language === "tamil"
                ? "புகார் பதிவு"
                : "File Complaint"}
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              {language === "tamil"
                ? "உங்கள் பிரச்சனையை நேரடியாக அதிகாரிகளுக்கு தெரிவிக்கவும்"
                : "Raise your transport issue directly to TN officials"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT PANEL */}
            <div className="lg:col-span-1 space-y-6">
              {/* Complaint Type Cards */}
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h2 className="font-bold text-xl mb-5">
                  Complaint Categories
                </h2>

                <div className="space-y-4">
                  {Object.entries(complaintTypes).map(
                    ([key, item]) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={key}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              complaintType: key,
                            })
                          }
                          className={`w-full p-4 rounded-2xl transition-all duration-300 border-2 group hover:scale-105 ${
                            formData.complaintType === key
                              ? "border-orange-500 bg-orange-50 shadow-lg"
                              : "border-transparent bg-gray-50 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}
                              >
                                <Icon size={22} />
                              </div>

                              <div className="text-left">
                                <p className="font-semibold">
                                  {language === "tamil"
                                    ? item.labelTA
                                    : item.labelEN}
                                </p>
                              </div>
                            </div>

                            <ChevronRight className="group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Official Contact Card */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <BadgeAlert />
                  <h2 className="font-bold text-xl">
                    Official Contact
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Mail />
                    <span>{currentOfficer.email}</span>
                  </div>

                  <div className="flex gap-3">
                    <Phone />
                    <span>{currentOfficer.phone}</span>
                  </div>

                  <a
                    href={currentOfficer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white text-orange-600 px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
                  >
                    Visit Official Website
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                      complaintTypes[
                        formData.complaintType
                      ].color
                    } flex items-center justify-center text-white shadow-lg`}
                  >
                    <ActiveIcon size={30} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {language === "tamil"
                        ? complaintTypes[
                            formData.complaintType
                          ].labelTA
                        : complaintTypes[
                            formData.complaintType
                          ].labelEN}
                    </h2>

                    <p className="text-gray-500">
                      Fill all details properly
                    </p>
                  </div>
                </div>

                {/* BASIC */}
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    icon={User}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />

                  <InputField
                    icon={Mail}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />

                  <InputField
                    icon={Phone}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />

                  <InputField
                    icon={Bus}
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleChange}
                    placeholder="Bus Number"
                  />

                  <InputField
                    icon={MapPin}
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    placeholder="Route"
                  />
                </div>

                {/* Dynamic Fields */}
                <div className="mt-6 space-y-5">
                  {formData.complaintType ===
                    "busDelay" && (
                    <div className="grid md:grid-cols-2 gap-5 animate-fadeIn">
                      <InputField
                        icon={Clock}
                        name="expectedTime"
                        value={formData.expectedTime}
                        onChange={handleChange}
                        placeholder="Expected Arrival Time"
                      />

                      <InputField
                        icon={Clock}
                        name="delayDuration"
                        value={formData.delayDuration}
                        onChange={handleChange}
                        placeholder="Delay Duration"
                      />
                    </div>
                  )}

                  {formData.complaintType ===
                    "behavior" && (
                    <div className="animate-fadeIn">
                      <InputField
                        icon={User}
                        name="staffName"
                        value={formData.staffName}
                        onChange={handleChange}
                        placeholder="Driver / Conductor Name"
                      />

                      <textarea
                        name="behaviorDetails"
                        value={
                          formData.behaviorDetails
                        }
                        onChange={handleChange}
                        placeholder="Explain staff behavior issue..."
                        className="w-full mt-4 p-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-orange-100 outline-none"
                        rows={4}
                      />
                    </div>
                  )}

                  {formData.complaintType ===
                    "womenSafety" && (
                    <div className="animate-fadeIn">
                      <InputField
                        icon={MapPin}
                        name="incidentLocation"
                        value={
                          formData.incidentLocation
                        }
                        onChange={handleChange}
                        placeholder="Incident Location"
                      />

                      <textarea
                        name="safetyIssue"
                        value={formData.safetyIssue}
                        onChange={handleChange}
                        placeholder="Describe safety issue..."
                        className="w-full mt-4 p-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-red-100 outline-none"
                        rows={4}
                      />
                    </div>
                  )}

                  {formData.complaintType ===
                    "ticketIssue" && (
                    <div className="grid md:grid-cols-2 gap-5 animate-fadeIn">
                      <InputField
                        icon={FileText}
                        name="ticketNumber"
                        value={formData.ticketNumber}
                        onChange={handleChange}
                        placeholder="Ticket Number"
                      />

                      <InputField
                        icon={Clock}
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        placeholder="Travel Date"
                      />
                    </div>
                  )}
                </div>

                {/* COMMON DETAILS */}
                <div className="mt-6">
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe complaint in detail..."
                    className="w-full p-5 rounded-3xl border border-gray-200 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <button
                    type="button"
                    onClick={generateEmailTemplate}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg"
                  >
                    <Sparkles />
                    Generate AI Email
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg"
                  >
                    <Send />
                    {loading
                      ? "Submitting..."
                      : "Submit Complaint"}
                  </button>
                </div>

                {/* AI EMAIL */}
                {aiEmail && (
                  <div className="mt-8 bg-gray-900 text-green-400 rounded-3xl p-6 shadow-2xl animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles />
                      <h3 className="font-bold text-lg">
                        AI Generated Official Email
                      </h3>
                    </div>

                    <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-96">
                      {aiEmail}
                    </pre>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  icon: Icon,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-all">
        <Icon size={20} />
      </div>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all"
      />
    </div>
  );
};

const UsersIcon = ({ size = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

export default ComplaintPage;