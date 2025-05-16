
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would validate credentials with the backend
    console.log("Login attempt with:", { username, password });
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

      {/* Login Form */}
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
              backgroundColor: "#D6BCFA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <IndianRupee size={36} style={{ color: "#7E69AB" }} />
            </div>
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center"
          }}>Login to Your Account</h2>
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
                Username
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
              Login
            </button>
          </form>
          <div style={{
            marginTop: "24px",
            textAlign: "center"
          }}>
            <p style={{ color: "#555555", fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#9b87f5", textDecoration: "none" }}>
                Register
              </Link>
            </p>
            <p style={{ color: "#555555", fontSize: "14px", marginTop: "8px" }}>
              <Link to="/staff-login" style={{ color: "#9b87f5", textDecoration: "none" }}>
                Staff Login
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

export default Login;
