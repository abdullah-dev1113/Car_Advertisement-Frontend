// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./OTPVerification.css";
// import OTP from "../image/corolla.webp";
// export default function OTPVerification({ email }) {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const inputsRef = useRef([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [info, setInfo] = useState("");
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const RESEND_COOLDOWN = 30;
//   const [cooldown, setCooldown] = useState(0);

//   useEffect(() => {
//     if (inputsRef.current[0]) inputsRef.current[0].focus();
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (cooldown > 0) {
//       timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
//     } else {
//       setResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [cooldown]);

//   const handleChange = (e, idx) => {
//     const val = e.target.value;
//     if (!/^\d*$/.test(val)) return;
//     const newOtp = [...otp];
//     newOtp[idx] = val.slice(-1);
//     setOtp(newOtp);
//     if (val && idx < 5) inputsRef.current[idx + 1].focus();
//   };

//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace") {
//       if (otp[idx] === "" && idx > 0) {
//         inputsRef.current[idx - 1].focus();
//       }
//       const newOtp = [...otp];
//       newOtp[idx] = "";
//       setOtp(newOtp);
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData("text");
//     if (!/^\d+$/.test(paste)) return;
//     const chars = paste.split("").slice(0, 6);
//     const newOtp = [...otp];
//     for (let i = 0; i < chars.length; i++) newOtp[i] = chars[i];
//     setOtp(newOtp);
//     e.preventDefault();
//   };

//   const code = otp.join("");
//   const canSubmit = code.length === 6;

//   const verifyCode = async () => {
//     if (!canSubmit) return;

//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/v1/otp/verify", {
//         email,
//         otp: code,
//       });

//       if (res.data.success) {
//         // Login auto again to get token + user
//         const loginRes = await axios.post(
//           "http://localhost:5000/api/v1/user/login",
//           {
//             email,
//             password: localStorage.getItem("tempPassword"), // saved at signup/login
//           }
//         );

//         const { user, token } = loginRes.data;

//         localStorage.setItem("loggedInUser", JSON.stringify(user));
//         localStorage.setItem("token", token);

//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError("Incorrect OTP");
//     }

//     setLoading(false);
//   };

//   const resendOtp = async () => {
//     setResendDisabled(true);
//     setCooldown(30);

//     try {
//       await axios.post("http://localhost:5000/api/v1/otp/send", { email });
//       setInfo("OTP resent successfully!");
//     } catch (err) {
//       setError("Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="otp-container">
//       {/* 🔹 Top Image Section with overlay heading */}
//       <div className="otp-image-section">
//         <img src={OTP} alt="Banner" className="otp-banner" />
//         <div className="otp-overlay-text">Email Verification</div>
//       </div>

//       {/* 🔹 OTP Input Section */}
//       <div className="otp-content">
//         <h3 className="otp-title">Enter OTP</h3>

//         <p className="otp-subtext">
//           We sent a 6-digit code to <strong>{email || "your email"}</strong>
//         </p>

//         <div className="inputs" onPaste={handlePaste}>
//           {otp.map((digit, idx) => (
//             <input
//               key={idx}
//               ref={(el) => (inputsRef.current[idx] = el)}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e, idx)}
//               onKeyDown={(e) => handleKeyDown(e, idx)}
//               className="otp-input"
//             />
//           ))}
//         </div>

//         {error && <div className="otp-error">{error}</div>}
//         {info && <div className="otp-info">{info}</div>}

//         <div className="otp-actions">
//           <button
//             className="otp-btn"
//             disabled={!canSubmit || loading}
//             onClick={verifyCode}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <button
//             className="otp-btn-link"
//             onClick={resendOtp}
//             disabled={resendDisabled}
//           >
//             {resendDisabled ? `Resend (${cooldown}s)` : "Resend OTP"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./OTPVerification.css";
import OTP from "../image/corolla.webp";
import { useAuth } from "../../components/authcontext.jsx";

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 FIXED: Email now correctly received from previous page
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const { user, setUser } = useAuth();
  const RESEND_COOLDOWN = 30;
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (e, idx) => {
    const val = e.target.value;

    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    if (val && idx < 5) inputsRef.current[idx + 1].focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx] === "" && idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[idx] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^\d+$/.test(paste)) return;

    const chars = paste.split("").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < chars.length; i++) newOtp[i] = chars[i];

    setOtp(newOtp);
    e.preventDefault();
  };

  const code = otp.join("").toString().trim();
  const canSubmit = code.length === 6;

  const verifyCode = async () => {
    if (!canSubmit) return;
    setLoading(true);

    try {
      const code = otp.join("");

      const res = await axios.post("http://localhost:5000/api/v1/otp/verify", {
        email,
        otp: code,
      });

      if (res.data.success) {
        const verifiedUser = res.data.user;
        const token = res.data.token;

        localStorage.setItem("loggedInUser", JSON.stringify(verifiedUser));
        localStorage.setItem("token", token);

        setUser(verifiedUser);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Incorrect OTP");
    }

    setLoading(false);
  };

  const resendOtp = async () => {
    setResendDisabled(true);
    setCooldown(RESEND_COOLDOWN);

    try {
      await axios.post("http://localhost:5000/api/v1/otp/send", { email });
      setInfo("OTP resent successfully!");
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-image-section">
        <img src={OTP} alt="Banner" className="otp-banner" />
        <div className="otp-overlay-text">Email Verification</div>
      </div>

      <div className="otp-content">
        <h3 className="otp-title">Enter OTP</h3>

        <p className="otp-subtext">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>

        <div className="inputs" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="otp-input"
            />
          ))}
        </div>

        {error && <div className="otp-error">{error}</div>}
        {info && <div className="otp-info">{info}</div>}

        <div className="otp-actions">
          <button
            className="otp-btn"
            disabled={!canSubmit || loading}
            onClick={verifyCode}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            className="otp-btn-link"
            onClick={resendOtp}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend (${cooldown}s)` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
