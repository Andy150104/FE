import React, { FormEvent, useEffect, useState } from "react";
import { registerUser } from "../../apis/ApiCreateOneUser";
import { ApiGetAllCompany } from "../../apis/ApiGetAllCompany";
import { useToast } from "../../context/ToastContext";
import "../../css/JobDetail.css";
import { CompanyResponse } from "../../model/CompanyResponse";
import InformationRegisterUser from "../../model/InformationRegisterUser";
import { Loading } from "../Loading/Loading";

export const CreateUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDiscription, setCompanyDiscription] = useState<string>(""); // Updated variable name to camelCase
  const [location, setLocation] = useState<string>("");
  const { showToast } = useToast();
  const [company, setCompany] = useState<CompanyResponse[]>([]);
  const[companyId, setCompanyId] = useState<string>("");
  const[role, setRole] = useState<string>("");
  const[email, setEmail] = useState<string>("");
  const[fullname, setFullName] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiGetAllCompany();
        setCompany(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (fullname && email && role && companyId) {
        const newUser = new InformationRegisterUser(0,fullname,email,parseInt(companyId),"",role);

        
        await registerUser([newUser]);

        showToast("User created successfully", "success");
        setFullName("");
        setEmail("");
        setRole("");
        setCompanyId("");
      } else {
        showToast("Please fill in all required fields", "error");
      }
    } catch (error) {
      console.error("Error submitting user registration:", error);
      showToast("Failed to create user", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-detail">
      {loading ? (
        <div>
            <Loading/>
        </div>
      ) : (
        <>
          <div className="container rounded mb-5  mt-5 d-flex justify-content-center align-items-center" id="job-block">
            <div className="row input-container">
              <h1 id="h1-apply-now">Create User Now</h1>
              <form onSubmit={handleSubmit}>
                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <label>Full Name</label>
                  </div>
                </div>

                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Your email</label>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="styled-input wide">
                  <select
                  id="input"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>
                    <option value="ROLE_INTERN">
                    ROLE_INTERN
                    </option>
                    <option value="ROLE_INTERNSHIP_COORDINATOR">
                    ROLE_INTERNSHIP_COORDINATOR
                    </option>
                    <option value="ROLE_MENTOR">
                    ROLE_MENTOR
                    </option>
                    <option value="ROLE_MANAGER">
                    ROLE_MANAGER
                    </option>
                    
                </select>
                  </div>
                </div>
                <div className="col-xs-12">
              <div className="styled-input wide">
                <select
                  id="input"
                  required
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Company
                  </option>
                  {company.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
                <div className="col-xs-12">
                  <button
                    type="submit"
                    id="btn-apply"
                    className="btn-lrg submit-btn"
                  >
                    Create
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                    <span className="fourth"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
