
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to the backend
    console.log("Registration data:", formData);
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

      {/* Register Form */}
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
          maxWidth: "600px"
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
          }}>Create Your Account</h2>
          <form onSubmit={handleSubmit} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
          }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
            <div style={{ gridColumn: "span 2" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
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
            <div style={{ gridColumn: "span 2" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
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
            <div style={{ gridColumn: "span 2" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
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
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
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
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555555"
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
            <button
              type="submit"
              style={{
                gridColumn: "span 2",
                backgroundColor: "#9b87f5",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "16px"
              }}
            >
              Register
            </button>
          </form>
          <div style={{
            marginTop: "24px",
            textAlign: "center"
          }}>
            <p style={{ color: "#555555", fontSize: "14px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#9b87f5", textDecoration: "none" }}>
                Login
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

export default Register;
