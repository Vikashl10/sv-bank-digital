
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In a real app, this would connect to the backend API
      console.log("Staff login attempt with:", { username, password });

      // Simulate API call with hardcoded successful login for demo
      const staffData = {
        staffId: 1,
        username: username,
        firstName: "Admin",
        lastName: "User",
        position: "Manager",
        department: "Operations"
      };

      // Store staff data in localStorage
      localStorage.setItem("staff", JSON.stringify(staffData));
      
      // Redirect to staff dashboard
      navigate("/staff-dashboard");

    } catch (err) {
      setError("Invalid staff credentials");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

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
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <IndianRupee size={24} style={{ color: "#9b87f5" }} />
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#7E69AB",
                marginLeft: "8px"
              }}>SV BANK</h1>
            </Link>
          </div>
        </div>
      </nav>

      {/* Staff Login Form */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
      }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "32px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#D3E4FD",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <IndianRupee size={36} style={{ color: "#1EAEDB" }} />
            </div>
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center"
          }}>Staff Login</h2>
          
          {error && (
            <div style={{
              backgroundColor: "#ffe2e5",
              color: "#ef4444",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontSize: "14px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: "#555555"
                }}
              >
                Staff Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: "#555555"
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#1EAEDB",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div style={{
            marginTop: "24px",
            textAlign: "center"
          }}>
            <p style={{ color: "#555555", fontSize: "14px" }}>
              <Link to="/login" style={{ color: "#1EAEDB", textDecoration: "none" }}>
                User Login
              </Link>
            </p>
          </div>
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

export default StaffLogin;
