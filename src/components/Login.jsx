import { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Login() {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
  };

  const sendOTP = async () => {
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;

    const confirmation = await signInWithPhoneNumber(
      auth,
      "+91" + phone,
      appVerifier
    );

    window.confirmationResult = confirmation;

    alert("OTP Sent");
  };

  const verifyOTP = async () => {
    const result = await window.confirmationResult.confirm(otp);
    console.log(result.user);
    alert("Login Successful");
  };

  return (
    <div>
      <h2>Login with Phone</h2>

      <input
        placeholder="Phone number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOTP}>Send OTP</button>

      <br /><br />

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOTP}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
}