import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, BriefcaseBusiness } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Authentification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [msign, setMsign] = useState("");
  const [idnp, setIdnp] = useState("");
  const [companies, setCompanies] = useState([]); 
  const [userData, setUserData] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); 
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const msignParam = queryParams.get("msign");
    if (msignParam) {
      setMsign(msignParam);
      fetchLoginData(msignParam);
    }
  }, [location]);

  const fetchLoginData = async (msignParam) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/login?msign=${msignParam}`
      );
      const data = response.data;
      console.log("Login data:", data);
      setIdnp(data.idnp);
      console.log(data.idnp);
      const userResponse = await axios.get(
        `http://localhost:8080/api/login/user/${data.idnp}`
      );
      setUserData(userResponse.data);

      const companiesResponse = await axios.get(
        `http://localhost:8080/api/login/company/${data.idnp}`
      );
      setCompanies(data.idno);
      console.log("Login data:", data);
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const handleSelectRole = (role, companyId = null) => {
    setSelectedRole(role);
    setSelectedCompany(companyId);
  };

  const fetchEligibility = async (role) => {
    try {
      let endpoint = "";
      if (role === "physical") {
        endpoint = `http://localhost:8080/api/eligibility/person/${msign}`;
      } else if (role === "juridical" && selectedCompany) {
        endpoint = `http://localhost:8080/api/eligibility/company/${selectedCompany}`;
      }
      const response = await axios.get(endpoint);
      console.log("Eligibility response:", response.data);
    } catch (error) {
      console.error("Error fetching eligibility:", error);
    }
  };

  const handleContinue = () => {
    if (selectedRole === "physical") {
      navigate(`/eligibility?msign=${msign}`);
    } else if (selectedRole === "juridical" && selectedCompany) {
      navigate(`/eligibility?idno=${selectedCompany}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/3 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-6">
          <User size={48} className="mx-auto mb-4" />
          {userData ? (
            <>
              <h2 className="text-xl font-bold">
                {userData.givenName} {userData.familyName}
              </h2>
              <p className="text-sm">Persoana fizică, IDNP: {idnp}</p>
            </>
          ) : (
            <h2 className="text-xl font-bold">Loading...</h2>
          )}
        </div>

        {/* Блок с выбором роли */}
        <div className="p-6 text-center">
          <button
            onClick={() => {handleSelectRole("physical"), handleContinue()}}
            className="bg-blue-500 text-white w-full py-2 rounded-lg font-bold hover:bg-blue-600 transition mb-4"
          >
            Intră ca persoană fizică 
          </button>
          <p className="text-gray-500 mb-2">Sau alege o companie:</p>
          {companies && companies.length > 0 ? (
            companies.map((companyId) => (
              <button
                key={companyId}
                onClick={() => {handleSelectRole("juridical", companyId), handleContinue()}}
                className="bg-green-500 text-white w-full py-2 rounded-lg font-bold hover:bg-green-600 transition mb-2"
              >
                {`Companie: IDNO ${companyId}`}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Nu există companii asociate</p>
          )}
        </div>

        <div className="p-6 text-center border-t">
          <button
            onClick={() => fetchEligibility(selectedRole)}
            className="bg-blue-500 text-white w-1/3 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
          >
            Continuă
          </button>
        </div>
      </div>
    </div>
  );
}