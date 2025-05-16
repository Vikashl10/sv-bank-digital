
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee, LogOut, User, CreditCard, Clock, Wallet, ArrowDownCircle, ArrowUpCircle, SendHorizontal } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferData, setTransferData] = useState({
    toAccountNumber: "",
    amount: "",
    description: ""
  });

  // For demo purposes, using hardcoded user data
  // In a real implementation, this would come from API after login
  useEffect(() => {
    // Simulate loading user data from localStorage (in real app would be from API)
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    try {
      const userData = JSON.parse(storedUser);
      setUserData(userData);
      
      // Fetch transactions (in real app)
      // For demo, we'll use sample transactions
      setTransactions([
        {
          transaction_id: 1,
          transaction_type: "DEPOSIT",
          amount: 5000,
          description: "Initial deposit",
          transaction_date: "2025-05-10T10:30:00",
          status: "COMPLETED"
        },
        {
          transaction_id: 2,
          transaction_type: "WITHDRAWAL",
          amount: 1000,
          description: "ATM Withdrawal",
          transaction_date: "2025-05-12T14:45:00",
          status: "COMPLETED"
        },
        {
          transaction_id: 3,
          transaction_type: "TRANSFER",
          amount: 2500,
          description: "Rent payment",
          transaction_date: "2025-05-15T09:20:00",
          status: "COMPLETED"
        }
      ]);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, API call would be made here
    alert(`Deposit of ₹${depositAmount} successful!`);
    setDepositAmount("");
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, API call would be made here
    alert(`Withdrawal of ₹${withdrawAmount} successful!`);
    setWithdrawAmount("");
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, API call would be made here
    alert(`Transfer of ₹${transferData.amount} to account ${transferData.toAccountNumber} successful!`);
    setTransferData({
      toAccountNumber: "",
      amount: "",
      description: ""
    });
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
            <div style={{
              display: "flex",
              alignItems: "center",
            }}>
              <User size={18} style={{ color: "#7E69AB", marginRight: "8px" }} />
              <span>Welcome, {userData?.firstName}</span>
            </div>
            <button onClick={handleLogout} style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              color: "#7E69AB",
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
              backgroundColor: "#D6BCFA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 16px"
            }}>
              <User size={32} style={{ color: "#7E69AB" }} />
            </div>
            <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
              {userData?.firstName} {userData?.lastName}
            </h3>
            <p style={{ textAlign: "center", color: "#777777", fontSize: "14px" }}>
              {userData?.email}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button 
              onClick={() => setActiveTab("overview")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "overview" ? "#f0f0ff" : "transparent",
                color: activeTab === "overview" ? "#7E69AB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <CreditCard size={18} style={{ marginRight: "12px" }} />
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("transactions")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "transactions" ? "#f0f0ff" : "transparent",
                color: activeTab === "transactions" ? "#7E69AB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Clock size={18} style={{ marginRight: "12px" }} />
              Transactions
            </button>
            <button 
              onClick={() => setActiveTab("transfer")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "transfer" ? "#f0f0ff" : "transparent",
                color: activeTab === "transfer" ? "#7E69AB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <SendHorizontal size={18} style={{ marginRight: "12px" }} />
              Transfer
            </button>
            <button 
              onClick={() => setActiveTab("deposit-withdraw")} 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: activeTab === "deposit-withdraw" ? "#f0f0ff" : "transparent",
                color: activeTab === "deposit-withdraw" ? "#7E69AB" : "#555555",
                border: "none",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Wallet size={18} style={{ marginRight: "12px" }} />
              Deposit/Withdraw
            </button>
            <Link 
              to="/apply-loan" 
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                background: "transparent",
                color: "#555555",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <IndianRupee size={18} style={{ marginRight: "12px" }} />
              Apply for Loan
            </Link>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "24px",
        }}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Account Overview</h2>
              <div style={{
                backgroundColor: "#f5f5fa",
                padding: "24px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}>
                <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Account Number</p>
                <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>{userData?.accountNumber}</p>
                <p style={{ fontSize: "14px", color: "#777777", marginBottom: "4px" }}>Available Balance</p>
                <p style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  color: "#333333",
                }}>
                  <IndianRupee size={28} style={{ marginRight: "4px" }} />
                  {userData?.balance?.toFixed(2) || "85,500.00"}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Recent Transactions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {transactions.slice(0, 3).map((tx: any) => (
                    <div key={tx.transaction_id} style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: tx.transaction_type === "DEPOSIT" ? "#e2f8f0" : 
                                        tx.transaction_type === "WITHDRAWAL" ? "#ffe2e5" : "#e9effd",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "16px",
                      }}>
                        {tx.transaction_type === "DEPOSIT" && <ArrowDownCircle size={20} style={{ color: "#10b981" }} />}
                        {tx.transaction_type === "WITHDRAWAL" && <ArrowUpCircle size={20} style={{ color: "#ef4444" }} />}
                        {tx.transaction_type === "TRANSFER" && <SendHorizontal size={20} style={{ color: "#3b82f6" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: "500" }}>{tx.description}</p>
                        <p style={{ fontSize: "14px", color: "#777777" }}>
                          {new Date(tx.transaction_date).toLocaleDateString()}
                        </p>
                      </div>
                      <p style={{
                        fontWeight: "600",
                        color: tx.transaction_type === "DEPOSIT" ? "#10b981" : "#ef4444"
                      }}>
                        {tx.transaction_type === "DEPOSIT" ? "+" : "-"}
                        <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                        {tx.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button 
                    onClick={() => setActiveTab("transactions")} 
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#7E69AB",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    View All Transactions
                  </button>
                </div>
              </div>
            </>
          )}
          
          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Transaction History</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {transactions.length > 0 ? (
                  transactions.map((tx: any) => (
                    <div key={tx.transaction_id} style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: tx.transaction_type === "DEPOSIT" ? "#e2f8f0" : 
                                        tx.transaction_type === "WITHDRAWAL" ? "#ffe2e5" : "#e9effd",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "16px",
                      }}>
                        {tx.transaction_type === "DEPOSIT" && <ArrowDownCircle size={20} style={{ color: "#10b981" }} />}
                        {tx.transaction_type === "WITHDRAWAL" && <ArrowUpCircle size={20} style={{ color: "#ef4444" }} />}
                        {tx.transaction_type === "TRANSFER" && <SendHorizontal size={20} style={{ color: "#3b82f6" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: "500" }}>{tx.description}</p>
                        <p style={{ fontSize: "14px", color: "#777777" }}>
                          {new Date(tx.transaction_date).toLocaleDateString()} {new Date(tx.transaction_date).toLocaleTimeString()}
                        </p>
                      </div>
                      <p style={{
                        fontWeight: "600",
                        color: tx.transaction_type === "DEPOSIT" ? "#10b981" : "#ef4444"
                      }}>
                        {tx.transaction_type === "DEPOSIT" ? "+" : "-"}
                        <IndianRupee size={14} style={{ display: "inline", marginRight: "2px" }} />
                        {tx.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", padding: "24px 0", color: "#777777" }}>
                    No transactions found
                  </p>
                )}
              </div>
            </>
          )}
          
          {/* Deposit/Withdraw Tab */}
          {activeTab === "deposit-withdraw" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Deposit & Withdraw</h2>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {/* Deposit Form */}
                <div style={{ 
                  flex: "1 1 300px", 
                  backgroundColor: "#f5f5fa",
                  padding: "24px",
                  borderRadius: "8px",
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Deposit Funds</h3>
                  <form onSubmit={handleDeposit}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                        Amount
                      </label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "12px", top: "10px" }}>
                          <IndianRupee size={16} />
                        </div>
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
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
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "500",
                        width: "100%",
                        cursor: "pointer"
                      }}
                    >
                      Deposit
                    </button>
                  </form>
                </div>
                
                {/* Withdraw Form */}
                <div style={{ 
                  flex: "1 1 300px", 
                  backgroundColor: "#f5f5fa",
                  padding: "24px",
                  borderRadius: "8px",
                }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Withdraw Funds</h3>
                  <form onSubmit={handleWithdraw}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                        Amount
                      </label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: "12px", top: "10px" }}>
                          <IndianRupee size={16} />
                        </div>
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
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
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "500",
                        width: "100%",
                        cursor: "pointer"
                      }}
                    >
                      Withdraw
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Transfer Tab */}
          {activeTab === "transfer" && (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>Transfer Money</h2>
              <div style={{ 
                backgroundColor: "#f5f5fa",
                padding: "24px",
                borderRadius: "8px",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <form onSubmit={handleTransfer}>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                      Recipient Account Number
                    </label>
                    <input
                      type="text"
                      value={transferData.toAccountNumber}
                      onChange={(e) => setTransferData({...transferData, toAccountNumber: e.target.value})}
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
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                      Amount
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "12px", top: "10px" }}>
                        <IndianRupee size={16} />
                      </div>
                      <input
                        type="number"
                        value={transferData.amount}
                        onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
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
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#555555" }}>
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={transferData.description}
                      onChange={(e) => setTransferData({...transferData, description: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px"
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "500",
                      width: "100%",
                      cursor: "pointer"
                    }}
                  >
                    Transfer Money
                  </button>
                </form>
              </div>
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

export default Dashboard;
