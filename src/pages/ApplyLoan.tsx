
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee, ArrowLeft } from "lucide-react";

const ApplyLoan = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    loanType: "PERSONAL",
    principleAmount: "",
    interestRate: "8.5",
    termMonths: "12",
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Simulate loading user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    try {
      const userData = JSON.parse(storedUser);
      setUserData(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, API call would be made here
    console.log("Loan application submitted:", formData);
    alert("Loan application submitted successfully!");
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f0f4ff, #f5f0ff)"
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(to bottom, #f0f4ff, #f5f0ff)"
    }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "16px 0"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            <Link to="/dashboard" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <IndianRupee size={24} style={{ color: "#9b87f5" }} />
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#7E69AB",
                marginLeft: "8px"
              }}>SV BANK</h1>
            </Link>
          </div>
          <div style={{
            display: "flex",
            gap: "24px",
            alignItems: "center"
          }}>
            <span>Welcome, {userData?.firstName}</span>
          </div>
        </div>
      </nav>

      {/* Loan Application Content */}
      <div style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        flexGrow: 1
      }}>
        <Link to="/dashboard" style={{
          display: "flex",
          alignItems: "center",
          color: "#7E69AB",
          textDecoration: "none",
          marginBottom: "24px"
        }}>
          <ArrowLeft size={20} style={{ marginRight: "8px" }} />
          Back to Dashboard
        </Link>

        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "32px",
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "32px" }}>Apply for a Loan</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                Loan Type
              </label>
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "16px",
                  backgroundColor: "white"
                }}
                required
              >
                <option value="PERSONAL">Personal Loan</option>
                <option value="HOME">Home Loan</option>
                <option value="AUTO">Auto Loan</option>
                <option value="EDUCATION">Education Loan</option>
                <option value="BUSINESS">Business Loan</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                Principle Amount
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "12px", top: "10px" }}>
                  <IndianRupee size={16} />
                </div>
                <input
                  type="number"
                  name="principleAmount"
                  value={formData.principleAmount}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 32px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px"
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "16px"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                Term (Months)
              </label>
              <select
                name="termMonths"
                value={formData.termMonths}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "16px",
                  backgroundColor: "white"
                }}
                required
              >
                <option value="12">12 months (1 year)</option>
                <option value="24">24 months (2 years)</option>
                <option value="36">36 months (3 years)</option>
                <option value="60">60 months (5 years)</option>
                <option value="120">120 months (10 years)</option>
              </select>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "16px"
                }}
                required
              />
            </div>

            {formData.principleAmount && (
              <div style={{
                backgroundColor: "#f5f5fa",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "32px"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Loan Summary</h3>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span>Principle Amount:</span>
                  <span style={{ fontWeight: "500" }}>
                    <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                    {parseFloat(formData.principleAmount).toFixed(2)}
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span>Interest Rate:</span>
                  <span style={{ fontWeight: "500" }}>{formData.interestRate}%</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span>Term:</span>
                  <span style={{ fontWeight: "500" }}>{formData.termMonths} months</span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span>Total Interest:</span>
                  <span style={{ fontWeight: "500" }}>
                    <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                    {(parseFloat(formData.principleAmount) * parseFloat(formData.interestRate) / 100 * parseInt(formData.termMonths) / 12).toFixed(2)}
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd", paddingTop: "12px", marginTop: "12px" }}>
                  <span style={{ fontWeight: "600" }}>Total Repayment:</span>
                  <span style={{ fontWeight: "600" }}>
                    <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                    {(parseFloat(formData.principleAmount) * (1 + parseFloat(formData.interestRate) / 100 * parseInt(formData.termMonths) / 12)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#9b87f5",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Submit Loan Application
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#f5f5f5",
        padding: "32px 0",
        textAlign: "center",
        marginTop: "40px"
      }}>
        <p style={{ color: "#555555" }}>© 2025 SV BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ApplyLoan;
