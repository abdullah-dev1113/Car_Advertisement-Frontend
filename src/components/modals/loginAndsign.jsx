// // import { useState } from "react";
// // import React from "react";
// // import Button from "react-bootstrap/Button";
// // import Modal from "react-bootstrap/Modal";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Page1 } from "../outlets/pages";
// // import axios from "axios";
// // import { useAuth } from "../authcontext.jsx";
// // import { toast } from "react-toastify";
// // import Spinner from "react-bootstrap/Spinner";

// // function Login() {
// //   const { setUser } = useAuth();
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [show, setShow] = useState(false);

// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);

// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true); // spinner on

// //     axios
// //       .post("http://localhost:5000/api/v1/user/login", {
// //         email,
// //         password,
// //       })
// //       .then((res) => {
// //         setLoading(false); // spinner off

// //         const { token, user } = res.data;
// //         // console.log("received token:", token);
// //         localStorage.setItem("token", token);
// //         localStorage.setItem("loggedInUser", JSON.stringify(user));
// //         setUser(user);
// //         toast.success("Login successful!", {
// //           position: "top-right",
// //           theme: "colored",
// //         });
// //         setShow(false);
// //         navigate("/Dashboard");
// //       })
// //       .catch((err) => {
// //         setLoading(false);
// //         console.error("Login error:", err);
// //         toast.error("Invalid email or password");
// //       });
// //   };

// //   return (
// //     <>
// //       <div className="d-flex gap-3 m-2">
// //         <Button
// //           variant="success"
// //           size="lg"
// //           onClick={handleShow}
// //           style={{
// //             fontSize: "17px",
// //           }}
// //         >
// //           Login
// //         </Button>
// //       </div>

// //       <Modal show={show} onHide={handleClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Login</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {loading ? (
// //             <div className="d-flex justify-content-center">
// //               <Spinner animation="border" variant="primary" />
// //             </div>
// //           ) : (
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-3">
// //                 <label className="form-label">Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label className="form-label">Password</label>
// //                 <input
// //                   type="password"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //               </div>
// //               <button type="submit" className="btn btn-primary w-100">
// //                 Login{" "}
// //               </button>
// //             </form>
// //           )}
// //         </Modal.Body>
// //         <Modal.Footer></Modal.Footer>
// //       </Modal>
// //     </>
// //   );
// // }

// // export default Login;

// import { useState } from "react";
// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import InputGroup from "react-bootstrap/InputGroup";
// import Form from "react-bootstrap/Form";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../authcontext.jsx";
// import { toast } from "react-toastify";
// import Spinner from "react-bootstrap/Spinner";
// import { EyeFill, EyeSlashFill, BoxArrowInRight } from "react-bootstrap-icons";
// import { FiMail, FiLock } from "react-icons/fi";

// function Login({ show, onClose, openSignup }) {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     axios
//       .post("http://localhost:5000/api/v1/user/login", { email, password })
//       .then((res) => {
//         setLoading(false);

//         // If user not verified → redirect to OTP page
//         if (res.data.sendOtp) {
//           toast.info("Please verify your email. OTP sent!", {
//             position: "top-right",
//             theme: "colored",
//           });

//           onClose();

//           navigate("/otp-verification", {
//             state: { email }, // OTP page ko email mil jayegi
//           });

//           return;
//         }

//         // ELSE: user verified → normal login
//         const { token, user } = res.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("loggedInUser", JSON.stringify(user));
//         setUser(user);

//         toast.success("Login successful!", {
//           position: "top-right",
//           theme: "colored",
//         });

//         onClose();
//         navigate("/Dashboard");
//       })
//       .catch(() => {
//         setLoading(false);
//         toast.error("Invalid email or password");
//       });
//   };

//   return (
//     <>
//       {/* Modal */}
//       <Modal
//         show={show}
//         onHide={onClose}
//         centered
//         animation={true}
//         dialogClassName="glass-modal"
//       >
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-white">
//             <BoxArrowInRight size={25} /> Welcome Back
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit} className="px-1">
//             {/* Email */}
//             <Form.Group className="mb-3">
//               <Form.Label className="text-white-50">Email</Form.Label>
//               <div className="position-relative">
//                 <FiMail className="input-icon" />
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   className="custom-input ps-5"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </Form.Group>

//             {/* Password */}
//             <Form.Group className="mb-3">
//               <Form.Label className="text-white-50">Password</Form.Label>

//               <div className="position-relative">
//                 <FiLock className="input-icon" />

//                 <Form.Control
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter password"
//                   required
//                   className="custom-input ps-5 pe-5"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <Button
//                   variant="link"
//                   className="password-toggle-btn"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeSlashFill /> : <EyeFill />}
//                 </Button>
//               </div>
//             </Form.Group>

//             {/* Submit button */}
//             <Button
//               type="submit"
//               variant="primary"
//               className="w-100 py-2 mt-2 modern-button"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />{" "}
//                   Logging in...
//                 </>
//               ) : (
//                 "Login"
//               )}
//             </Button>

//             {/* Optional signup link */}
//             <div className="text-center mt-3">
//               <small className="text-white-50">
//                 Don’t have an account?{" "}
//                 <Link
//                   to="#"
//                   className="fw-bold text-info"
//                   onClick={() => {
//                     onClose(); // close login modal
//                     openSignup(); // open signup modal
//                   }}
//                 >
//                   Create one
//                 </Link>
//               </small>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Glass + UI styling */}
//       <style>{`
//         /* Glass Modal */
//         .glass-modal .modal-content {
//           backdrop-filter: blur(18px);
//           background: rgba(255, 255, 255, 0.08) !important;
//           border: 1px solid rgba(255, 255, 255, 0.15);
//           border-radius: 18px;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
//         }

//         /* Trigger Button */
//         .login-btn {
//           font-size: 17px;
//           border-radius: 10px;
//           padding: 8px 20px;
//         }

//         /* Inputs */
//         .custom-input {
//           background: rgba(255, 255, 255, 0.12);
//           border: 1px solid rgba(255, 255, 255, 0.18);
//           color: #fff;
//           padding: 10px 12px;
//           height: 48px;
//           border-radius: 12px;
//         }
//         .custom-input::placeholder {
//           color: rgba(255, 255, 255, 0.55);
//         }
//         .custom-input:focus {
//           box-shadow: 0 0 0 2px rgba(0, 153, 255, 0.4);
//           border-color: #0d6efd;
//         }

//         /* Icons inside input */
//         .input-icon {
//           position: absolute;
//           top: 50%;
//           left: 14px;
//           transform: translateY(-50%);
//           color: rgba(255,255,255,0.6);
//           font-size: 20px;
//         }

//         /* Show/hide password button */
//         .password-toggle-btn {
//           position: absolute;
//           right: 8px;
//           top: 50%;
//           transform: translateY(-50%);
//           padding: 0;
//           color: rgba(255,255,255,0.7);
//         }

//         /* Modern Button */
//         .modern-button {
//           border-radius: 12px;
//           font-size: 18px;
//           background: linear-gradient(135deg, #4a6cf7, #6a8bff);
//           border: none;
//           transition: all .25s ease;
//         }
//         .modern-button:hover {
//           opacity: .9;
//           transform: translateY(-1px);
//         }
//         .modern-button:active {
//           transform: scale(.97);
//         }
//       `}</style>
//     </>
//   );
// }

// export default Login;

import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authcontext.jsx";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { EyeFill, EyeSlashFill, BoxArrowInRight } from "react-bootstrap-icons";
import { FiMail, FiLock } from "react-icons/fi";

function Login({ show, onClose, openSignup }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //http://localhost:5000/api/v1/user/login

    try {
      const res = await axios.post(
        "https://car-advertisement-backend.onrender.com/api/v1/user/login",
        {
          email,
          password,
        }
      );

      setLoading(false);

      // 🟡 If backend says user not verified → send to OTP verification
      if (res.data.sendOtp === true) {
        toast.info("Please verify your email. OTP sent!", {
          position: "top-right",
          theme: "colored",
        });

        onClose();

        navigate("/otp-verification", {
          state: { email },
        });

        return;
      }

      // 🟢 Verified → normal login success
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);

      toast.success("Login successful!", {
        position: "top-right",
        theme: "colored",
      });

      onClose();
      navigate("/Dashboard");
    } catch (err) {
      setLoading(false);
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        centered
        animation={true}
        dialogClassName="glass-modal"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-white">
            <BoxArrowInRight size={25} /> Welcome Back
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit} className="px-1">
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Email</Form.Label>
              <div className="position-relative">
                <FiMail className="input-icon" />
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  className="custom-input ps-5"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label className="text-white-50">Password</Form.Label>
              <div className="position-relative">
                <FiLock className="input-icon" />

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  className="custom-input ps-5 pe-5"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  variant="link"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 mt-2 modern-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* SIGNUP LINK */}
            <div className="text-center mt-3">
              <small className="text-white-50">
                Don’t have an account?{" "}
                <Link
                  to="#"
                  className="fw-bold text-info"
                  onClick={() => {
                    onClose();
                    openSignup();
                  }}
                >
                  Create one
                </Link>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Styles */}
      <style>{`
        .glass-modal .modal-content {
          backdrop-filter: blur(18px);
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
        }

        .custom-input {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff;
          padding: 10px 12px;
          height: 48px;
          border-radius: 12px;
        }
        .custom-input::placeholder {
          color: rgba(255, 255, 255, 0.55);
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.6);
          font-size: 20px;
        }

        .password-toggle-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          padding: 0;
          color: rgba(255,255,255,0.7);
        }

        .modern-button {
          border-radius: 12px;
          font-size: 18px;
          background: linear-gradient(135deg, #4a6cf7, #6a8bff);
          border: none;
          transition: all .25s ease;
        }
      `}</style>
    </>
  );
}

export default Login;
