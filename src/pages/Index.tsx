
import React from "react";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
            <IndianRupee size={24} style={{ color: "#9b87f5" }} />
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#7E69AB",
              marginLeft: "8px"
            }}>SV BANK</h1>
          </div>
          <div style={{
            display: "flex",
            gap: "16px"
          }}>
            <Link to="/login">
              <Button variant="outline" style={{
                color: "#9b87f5",
                borderColor: "#9b87f5",
                backgroundColor: "transparent"
              }}>Login</Button>
            </Link>
            <Link to="/register">
              <Button style={{
                backgroundColor: "#9b87f5",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}>Register</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "60px"
        }}>
          <h2 style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "24px",
            color: "#222222"
          }}>Banking Made <span style={{ color: "#9b87f5" }}>Simple</span></h2>
          <p style={{
            fontSize: "20px",
            color: "#555555",
            marginBottom: "32px",
            maxWidth: "600px"
          }}>
            Experience seamless banking with SV BANK. Manage your finances, transfer money, and apply for loans all in one place.
          </p>
          <div style={{
            display: "flex",
            gap: "16px"
          }}>
            <Link to="/register">
              <button style={{
                backgroundColor: "#9b87f5",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "18px",
                cursor: "pointer"
              }}>
                Get Started
              </button>
            </Link>
            <Link to="/staff-login">
              <button style={{
                backgroundColor: "transparent",
                color: "#9b87f5",
                border: "1px solid #9b87f5",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "18px",
                cursor: "pointer"
              }}>
                Staff Login
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          width: "100%",
          marginTop: "40px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#D6BCFA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <IndianRupee size={24} style={{ color: "#7E69AB" }} />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>Easy Transfers</h3>
            <p style={{ color: "#555555" }}>Transfer money instantly to any account within SV BANK or to other banks.</p>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#D3E4FD",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <IndianRupee size={24} style={{ color: "#1EAEDB" }} />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>Quick Loans</h3>
            <p style={{ color: "#555555" }}>Apply for various types of loans with competitive interest rates.</p>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#f5efd6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <IndianRupee size={24} style={{ color: "#d4a017" }} />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>Secure Banking</h3>
            <p style={{ color: "#555555" }}>Your money is safe with our state-of-the-art security systems.</p>
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

export default Index;
