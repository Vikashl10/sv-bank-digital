
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee, LogOut, User, Users, CreditCard, FileText } from "lucide-react";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);

  // For demo purposes, using hardcoded staff data
  useEffect(() => {
    // Simulate loading staff data from localStorage
    const storedStaff = localStorage.getItem("staff");
    
    if (!storedStaff) {
      navigate("/staff-login");
      return;
    }
    
    try {
      const staffData = JSON.parse(storedStaff);
      setStaffData(staffData);
      
      // Sample users data
      setUsers([
        {
          user_id: 1,
          username: "john_doe",
          email: "john@example.com",
          first_name: "John",
          last_name: "Doe",
          phone_number: "9876543210",
          account_count: 1,
          total_balance: 85500,
          loan_count: 1
        },
        {
          user_id: 2,
          username: "sarah_smith",
          email: "sarah@example.com",
          first_name: "Sarah",
          last_name: "Smith",
          phone_number: "9876543211",
          account_count: 2,
          total_balance: 120000,
          loan_count: 0
        }
      ]);
      
      // Sample pending loans
      setPendingLoans([
        {
          loan_id: 1,
          user_id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          loan_type: "PERSONAL",
          principle_amount: 50000,
          interest_rate: 8.5,
          term_months: 24,
          start_date: "2025-05-01",
          due_date: "2027-05-01",
          account_number: "SV00012345",
          balance: 85500,
          created_at: "2025-05-16T10:30:00"
        }
      ]);
    } catch (error) {
      console.error("Error parsing staff data:", error);
      navigate("/staff-login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("staff");
    navigate("/staff-login");
  };

  const handleApproveLoan = (loanId: number) => {
    // In real app, API call would be made here
    console.log(`Approving loan ID: ${loanId}`);
    // Remove the loan from the pending list (simulate approval)
    setPendingLoans(pendingLoans.filter((loan: any) => loan.loan_id !== loanId));
    alert(`Loan #${loanId} approved successfully!`);
  };

  const handleRejectLoan = (loanId: number) => {
    // In real app, API call would be made here
    console.log(`Rejecting loan ID: ${loanId}`);
    // Remove the loan from the pending list (simulate rejection)
    setPendingLoans(pendingLoans.filter((loan: any) => loan.loan_id !== loanId));
    alert(`Loan #${loanId} rejected!`);
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
            <Link to="/staff-dashboard" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <IndianRupee size={24} style={{ color: "#1EAEDB" }} />
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1EAEDB",
                marginLeft: "8px"
              }}>SV BANK STAFF</h1>
            </Link>
          </div>
          <div style={{
            display: "flex",
            gap: "24px",
            alignItems: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
            }}>
              <User size={18} style={{ color: "#1EAEDB", marginRight: "8px" }} />
              <span>Staff: {staffData?.firstName} {staffData?.lastName} ({staffData?.position})</span>
            </div>
            <button onClick={handleLogout} style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              color: "#1EAEDB",
              cursor: "pointer",
            }}>
              <LogOut size={18} style={{ marginRight: "8px" }} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        display: "flex",
        gap: "20px",
        flexGrow: 1
      }}>
        {/* Sidebar */}
        <div style={{
          width: "250px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "24px",
          height: "fit-content"
        }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#D3E4FD",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 16px"
            }}>
              <User size={32} style={{ color: "#1EAEDB" }} />
            </div>
            <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
              {staffData?.firstName} {staffData?.lastName}
            </h3>
            <p style={{ textAlign: "center", color: "#777777", fontSize: "14px" }}>
              {staffData?.position}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button 
              onClick={() => setActiveTab("users")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "users" ? "#e9f7fb" : "transparent",
                color: activeTab === "users" ? "#1EAEDB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Users size={18} style={{ marginRight: "12px" }} />
              Manage Users
            </button>
            <button 
              onClick={() => setActiveTab("loans")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "loans" ? "#e9f7fb" : "transparent",
                color: activeTab === "loans" ? "#1EAEDB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <FileText size={18} style={{ marginRight: "12px" }} />
              Pending Loans
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "24px",
          overflowX: "auto"
        }}>
          {/* Users Tab */}
          {activeTab === "users" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Manage Users</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5fa" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>ID</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Name</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Username</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Email</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Phone</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Accounts</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Total Balance</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #eee" }}>Loans</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr key={user.user_id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "12px 16px" }}>{user.user_id}</td>
                      <td style={{ padding: "12px 16px" }}>{user.first_name} {user.last_name}</td>
                      <td style={{ padding: "12px 16px" }}>{user.username}</td>
                      <td style={{ padding: "12px 16px" }}>{user.email}</td>
                      <td style={{ padding: "12px 16px" }}>{user.phone_number}</td>
                      <td style={{ padding: "12px 16px" }}>{user.account_count}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                        {user.total_balance.toFixed(2)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>{user.loan_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          
          {/* Pending Loans Tab */}
          {activeTab === "loans" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Pending Loan Applications</h2>
              {pendingLoans.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {pendingLoans.map((loan: any) => (
                    <div key={loan.loan_id} style={{
                      border: "1px solid #eee",
                      borderRadius: "8px",
                      padding: "20px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Loan #{loan.loan_id}</h3>
                        <span style={{ 
                          backgroundColor: "#e9f7fb", 
                          color: "#1EAEDB",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>
                          {loan.loan_type} LOAN
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                        <div>
                          <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Applicant</p>
                          <p style={{ fontWeight: "500" }}>{loan.first_name} {loan.last_name}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Email</p>
                          <p style={{ fontWeight: "500" }}>{loan.email}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Account Number</p>
                          <p style={{ fontWeight: "500" }}>{loan.account_number}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Current Balance</p>
                          <p style={{ fontWeight: "500" }}>
                            <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                            {loan.balance.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div style={{ backgroundColor: "#f5f5fa", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>Loan Details</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Principal Amount</p>
                            <p style={{ fontWeight: "500" }}>
                              <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                              {loan.principle_amount.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Interest Rate</p>
                            <p style={{ fontWeight: "500" }}>{loan.interest_rate}%</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Term</p>
                            <p style={{ fontWeight: "500" }}>{loan.term_months} months</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Total Interest</p>
                            <p style={{ fontWeight: "500" }}>
                              <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                              {(loan.principle_amount * loan.interest_rate / 100 * loan.term_months / 12).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Start Date</p>
                            <p style={{ fontWeight: "500" }}>{new Date(loan.start_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Due Date</p>
                            <p style={{ fontWeight: "500" }}>{new Date(loan.due_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "16px" }}>
                        <button 
                          onClick={() => handleApproveLoan(loan.loan_id)} 
                          style={{
                            flex: 1,
                            backgroundColor: "#10b981",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer"
                          }}
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRejectLoan(loan.loan_id)} 
                          style={{
                            flex: 1,
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer"
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center", padding: "40px 0", color: "#777777" }}>
                  No pending loan applications
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#f5f5f5",
        padding: "32px 0",
        textAlign: "center"
      }}>
        <p style={{ color: "#555555" }}>© 2025 SV BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StaffDashboard;
