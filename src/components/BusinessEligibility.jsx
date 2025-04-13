import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Heart from "../img/heart.jpg";
import Logo from "../img/logo.png";
import Options from "../img/option.png";
import { Check, X, ChevronUp, ChevronDown } from "lucide-react";

export default function BusinessEligibility() {
  const location = useLocation();
  const [eligibilityData, setEligibilityData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const msign = q.get("msign");
    const idno = q.get("idno");

    if (!msign && !idno) return; // nothing to do

    const fetchEligibility = async () => {
      try {
        const url = msign
          ? `http://localhost:8080/api/eligibility/person/${msign}`
          : `http://localhost:8080/api/eligibility/company/${idno}`;
        const res = await axios.get(url);
        setEligibilityData(res.data || []);
      } catch (err) {
        console.error("Error fetching eligibility:", err);
      }
    };
    fetchEligibility();
  }, [location]);

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/3 mt-5 bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-4">
          <img src={Heart} alt="Heart" />
          <img src={Logo} alt="Logo" />
          <img src={Options} alt="Options" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">
          Eligibilitatea Întreprinderii
        </h2>

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
                    {program.moneyValue.toLocaleString("ro-RO")} MDL
                  </span>
                </div>

                <div className="flex items-center justify-between py-2border-t border-gray-200 mt-2">
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
    </div>
  );
}
