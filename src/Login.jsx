import { useState } from "react";
import { auth } from "./firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const sendOTP = async () => {
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        window.recaptchaVerifier
      );
      setConfirm(confirmation);
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP. Try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await confirm.confirm(otp);
      onLogin({
        name: "User",
        phone: phone,
        uid: result.user.uid,
      });
    } catch (err) {
      setError("Wrong OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg,#1a0a00,#3d1500)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 40,
        width: "100%", maxWidth: 400, textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{
          width: 60, height: 60, background: "linear-gradient(135deg,#FF6B2B,#e85a1a)",
          borderRadius: 16, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 28, margin: "0 auto 16px"
        }}>⭐</div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.8rem",
          fontWeight: 700, marginBottom: 6
        }}>LocalRate</h1>

        <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>
          {step === "phone"
            ? "Enter your mobile number to continue"
            : `OTP sent to +91 ${phone}`}
        </p>

        {step === "phone" ? (
          <>
            <div style={{
              display: "flex", border: "1.5px solid #e8ddd4",
              borderRadius: 10, overflow: "hidden", marginBottom: 12
            }}>
              <span style={{
                padding: "12px 14px", background: "#f8f4f0",
                color: "#555", fontSize: 14, fontWeight: 600,
                borderRight: "1.5px solid #e8ddd4"
              }}>🇮🇳 +91</span>
              <input
                type="tel" maxLength={10}
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                style={{
                  flex: 1, padding: "12px 14px", border: "none",
                  outline: "none", fontSize: 15, fontFamily: "inherit"
                }}
              />
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              onClick={sendOTP} disabled={loading}
              style={{
                width: "100%", background: "linear-gradient(135deg,#FF6B2B,#e85a1a)",
                color: "#fff", border: "none", borderRadius: 10, padding: "13px",
                fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
              }}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
              {[0,1,2,3,4,5].map(i => (
                <input
                  key={i} type="tel" maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const newOtp = otp.split("");
                    newOtp[i] = val;
                    setOtp(newOtp.join(""));
                    if (val && e.target.nextSibling) e.target.nextSibling.focus();
                  }}
                  style={{
                    width: 44, height: 52, textAlign: "center", fontSize: 20,
                    fontWeight: 700, border: "1.5px solid #e8ddd4", borderRadius: 10,
                    outline: "none", fontFamily: "inherit"
                  }}
                />
              ))}
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button
              onClick={verifyOTP} disabled={loading}
              style={{
                width: "100%", background: "linear-gradient(135deg,#FF6B2B,#e85a1a)",
                color: "#fff", border: "none", borderRadius: 10, padding: "13px",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", marginBottom: 12
              }}>
              {loading ? "Verifying..." : "Verify OTP ✓"}
            </button>
            <button
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              style={{
                background: "none", border: "none", color: "#FF6B2B",
                cursor: "pointer", fontSize: 13, fontFamily: "inherit"
              }}>
              ← Change number
            </button>
          </>
        )}
        <div id="recaptcha-container" />
      </div>
    </div>
  );
}