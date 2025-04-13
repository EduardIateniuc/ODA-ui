import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Info,
  User,
  Users,
  BriefcaseBusiness,
  Check,
  X,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function GovernmentPortal() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [language, setLanguage] = useState("ro");
  const [eligibilityData, setEligibilityData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showEligibility, setShowEligibility] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    // If eligibility section is active, fetch the data
    if (showEligibility) {
      fetchEligibilityData();
    }
  }, [showEligibility]);

  const fetchEligibilityData = async () => {
    try {
      // Example: Fetch data for the logged in user (Vasile Schidu)
      const idno = "2002004005001"; // Using the IDNP from the profile
      const url = `http://localhost:8080/api/eligibility/person/${idno}`;
      const res = await axios.get(url);
      setEligibilityData(res.data || []);
    } catch (err) {
      console.error("Error fetching eligibility:", err);
    }
  };

  const toggleEligibilitySection = () => {
    setShowEligibility(!showEligibility);
    setActiveSection("eligibility");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/api/placeholder/24/24"
            alt="Coat of arms"
            className="h-6"
          />
          <span className="text-xs font-bold">GUVERNUL REPUBLICII MOLDOVA</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm flex items-center gap-1">
            <Mail size={16} />
            <span>Mesaje</span>
          </button>
          <div className="relative">
            <button className="text-sm flex items-center gap-1">
              <span>Română</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="text-sm flex items-center gap-1">
              <span>Vasile Schidu</span>
              <User size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Header */}
      <div className="bg-white shadow-sm p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/api/placeholder/40/40"
            alt="Portal logo"
            className="h-10"
          />
          <div>
            <div className="font-bold text-blue-800">
              Portalul Guvernamental
            </div>
            <div className="text-xs text-gray-500">al cetățeanului</div>
          </div>
        </div>
        <button className="text-blue-800 text-sm">Despre portal</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r shadow-sm p-4">
          {/* Profile Card */}
          <div className="mb-6 border rounded-lg overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <User size={40} className="text-blue-600" />
              <div>
                <h3 className="font-bold text-lg">Vasile Schidu</h3>
                <button className="text-blue-600 text-xs">
                  Editează profilul
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border-t">
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                <h4 className="font-semibold text-sm">INFORMAȚIE PERSONALĂ</h4>
                <button className="text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs text-gray-500">IDNP:</div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-500" />
                  <span className="text-sm">2002004005001</span>
                </div>

                <div className="text-xs text-gray-500">EMAIL:</div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <span className="text-sm">schidu.vasile@gmail.com</span>
                </div>

                <div className="text-xs text-gray-500">TELEFON:</div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  <span className="text-sm">+373 67 900 123</span>
                </div>

                <button className="flex items-center gap-2 text-blue-600 text-sm">
                  <Info size={14} />
                  <span>Vezi toate actele deținute</span>
                </button>

                <button className="flex items-center gap-2 text-blue-600 text-sm">
                  <Users size={14} />
                  <span>Contacte</span>
                </button>

                <button className="flex items-center gap-2 text-blue-600 text-sm">
                  <Users size={14} />
                  <span>Împuterniciri</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
              <h4 className="font-semibold text-sm">SERVICII</h4>
              <button className="text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="p-2">
              <button 
                className={`w-full text-left p-2 rounded flex items-center gap-2 ${showEligibility ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={toggleEligibilitySection}
              >
                <BriefcaseBusiness size={18} className={showEligibility ? "text-blue-700" : "text-blue-600"} />
                <span>Eligibilitatea Întreprinderii</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 p-6 bg-gray-100">
          {!showEligibility ? (
            <>
              <h1 className="text-2xl font-semibold mb-6">
                Bună dimineața, Vasile! 👋
              </h1>
              <div className="grid grid-cols-2 gap-6">
                {/* Dashboard content would go here */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium mb-4">Servicii Populare</h2>
                  <p className="text-gray-600">
                    Accesează rapid serviciile de care ai nevoie.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-medium mb-4">Notificări</h2>
                  <p className="text-gray-600">
                    Nu ai nicio notificare nouă.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                  Eligibilitatea Întreprinderii
                </h1>
                <button 
                  onClick={() => setShowEligibility(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Înapoi la tabloul de bord
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                {eligibilityData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Nu există date de eligibilitate</h3>
                    <p className="text-gray-500 text-center max-w-md">
                      Momentan nu avem date despre eligibilitatea întreprinderii tale pentru programe de finanțare.
                    </p>
                  </div>
                ) : (
                  <div>
                    {eligibilityData.map((program, index) => (
                      <div key={index} className="mb-4">
                        {/* header row */}
                        <div
                          className={`flex justify-between bg-blue-50 px-4 py-4 rounded-xl
                                      items-center cursor-pointer transition-all
                                      ${expandedIndex === index ? "bg-blue-100" : ""}`}
                          onClick={() =>
                            setExpandedIndex(expandedIndex === index ? null : index)
                          }
                        >
                          <span className="font-medium">{program.program}</span>
                          <div className="flex items-center">
                            {program.eligible ? (
                              <span
                                className="text-green-500 bg-green-100 px-3 py-1 rounded-xl
                                            font-medium border mr-2"
                              >
                                Eligibil
                              </span>
                            ) : (
                              <span
                                className="text-red-500 bg-red-100 px-3 py-1 rounded-xl
                                            font-medium border mr-2"
                              >
                                Neeligibil
                              </span>
                            )}
                            {expandedIndex === index ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </div>
                        </div>

                        {/* details */}
                        {expandedIndex === index && (
                          <div
                            className="mt-2 pl-4 pr-2 py-3 bg-gray-50 rounded-xl
                                          border border-gray-100"
                          >
                            <h3 className="font-medium mb-2 text-gray-700">Detalii:</h3>

                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm">Motiv:</span>
                              <span className="text-sm text-gray-700">
                                {program.reason}
                              </span>
                            </div>

                            <div
                              className="flex items-center justify-between py-2
                                            border-t border-gray-200 mt-2"
                            >
                              <span className="text-sm">Suma disponibilă:</span>
                              <span className="text-sm font-medium text-blue-600">
                                {program.moneyValue?.toLocaleString("ro-RO") || "0"} MDL
                              </span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-t border-gray-200">
                              <span className="text-sm">Eligibilitate:</span>
                              {program.eligible ? (
                                <div className="flex items-center text-green-600">
                                  <Check size={18} className="mr-1" />
                                  <span className="text-xs">Îndeplinit</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-red-500">
                                  <X size={18} className="mr-1" />
                                  <span className="text-xs">Neîndeplinit</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt="Coat of arms"
                className="h-8 mr-2"
              />
              <div>
                <div className="text-sm font-bold text-white">
                  PORTALUL GUVERNAMENTAL
                </div>
                <div className="text-xs">AL CETĂȚEANULUI</div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm mb-1">Serviciu Suport Client</div>
              <div className="text-white font-bold">022 820 000</div>
              <div className="flex justify-center md:justify-end mt-2 space-x-3">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-3.11 14.323l-.095-.054A5.97 5.97 0 016 12c0-1.654.673-3.153 1.761-4.238A6.009 6.009 0 0112 6c1.654 0 3.153.673 4.238 1.762A6.009 6.009 0 0118 12a5.97 5.97 0 01-1.804 4.27l-.1.053L15 16.323A4.472 4.472 0 0012 17c-1.088 0-2.088-.386-2.87-1.03h-.001L9 16.323z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs">
            © Copyright. Agenția De Guvernare Electronică 2020
          </div>
        </div>
      </footer>
    </div>
  );
}