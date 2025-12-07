// // import { useState } from "react";
// // import React from "react";
// // import Button from "react-bootstrap/Button";
// // import Modal from "react-bootstrap/Modal";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../authcontext";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import Spinner from "react-bootstrap/Spinner";
// // // import { error } from 'console';

// // function Signup() {
// //   const { setUser } = useAuth();
// //   const [show, setShow] = useState(false);
// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);
// //   const navigate = useNavigate();

// //   // const [date, setDate] = useState('');
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [contact, setContact] = useState("");
// //   const [date, setDate] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [image, setImage] = useState("");
// //   const [role, setRole] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const newUser = {
// //       name,
// //       email,
// //       password,
// //       birthDate: date,
// //       contact: [contact],
// //       role,
// //       image,
// //       address,
// //     };

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/v1/user/create",
// //         newUser
// //       );

// //       const createdUser = res.data.user;
// //       const token = res.data.token;

// //       // Update context and localStorage
// //       setUser(createdUser);
// //       localStorage.setItem("loggedInUser", JSON.stringify(createdUser));
// //       if (token) localStorage.setItem("token", token);

// //       toast.success("Signup Successful!", {
// //         position: "top-right",
// //         theme: "colored",
// //       });
// //       setShow(false);

// //       navigate("/Dashboard"); // redirect immediately
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //       toast.error("Signup failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImage(reader.result); // base64 string
// //     };
// //     if (file) reader.readAsDataURL(file);
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
// //           Sign up
// //         </Button>
// //       </div>

// //       <Modal show={show} onHide={handleClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Sign up</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {loading ? (
// //             <div
// //               className="d-flex justify-content-center align-items-center"
// //               style={{
// //                 height: "200px",
// //               }}
// //             >
// //               <Spinner animation="border" variant="primary" />
// //             </div>
// //           ) : (
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-3">
// //                 <label className="form-label">Name</label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setName(e.target.value)}
// //                 />
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Email</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Password</label>
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label className="form-label">Date of birth</label>
// //                 <input
// //                   type="date"
// //                   name="Birth"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setDate(e.target.value)}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label className="form-label">Contact Number</label>
// //                 <input
// //                   type="Number"
// //                   name="Number"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setContact(e.target.value)}
// //                 />
// //               </div>
// //               <div className="mb-3">
// //                 <label className="form-label">Address</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   required
// //                   onChange={(e) => setAddress(e.target.value)}
// //                 />
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Role</label>
// //                 <select
// //                   className="form-label"
// //                   required
// //                   onChange={(e) => setRole(e.target.value)}
// //                 >
// //                   <option value="">Select Role</option>
// //                   <option value="685d7c9702176fd7b0f1c7b2">User</option>
// //                   <option value="685d7c7102176fd7b0f1c7af">Admin</option>
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Image</label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleImageChange}
// //                   required
// //                 />
// //               </div>

// //               <button type="submit" className="btn btn-primary w-100">
// //                 Sign Up
// //               </button>
// //             </form>
// //           )}
// //         </Modal.Body>
// //       </Modal>
// //     </>
// //   );
// // }

// // export default Signup;

// import { useState } from "react";
// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Spinner from "react-bootstrap/Spinner";
// import {
//   PersonFill,
//   EnvelopeFill,
//   KeyFill,
//   TelephoneFill,
//   HouseFill,
//   CalendarEventFill,
//   PersonBadgeFill,
//   ImageFill,
// } from "react-bootstrap-icons";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../authcontext";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Signup({ show, onClose }) {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [date, setDate] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState("");
//   const [preview, setPreview] = useState(null);
//   const [role, setRole] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//       setPreview(reader.result); // preview image
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const newUser = {
//       name,
//       email,
//       password,
//       birthDate: date,
//       contact: [contact],
//       role,
//       image,
//       address,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/user/create",
//         newUser
//       );

//       const createdUser = res.data.user;
//       const token = res.data.token;

//       setUser(createdUser);
//       localStorage.setItem("loggedInUser", JSON.stringify(createdUser));
//       if (token) localStorage.setItem("token", token);

//       toast.success("Signup Successful!", { theme: "colored" });
//       await axios.post("http://localhost:5000/api/v1/otp/send", { email });
//       onClose();

//       navigate("/otp-verification", {
//         state: { email },
//       });
//     } catch (err) {
//       toast.error("Signup failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={onClose}
//         centered
//         animation
//         dialogClassName="glass-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title className="fw-bold">Create Your Account</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {loading ? (
//             <div
//               className="d-flex justify-content-center align-items-center"
//               style={{ height: "200px" }}
//             >
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : (
//             <Form onSubmit={handleSubmit}>
//               {/* NAME */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Name</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <PersonFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* EMAIL */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <EnvelopeFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="email"
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* PASSWORD */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <KeyFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* DOB */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Date of Birth</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <CalendarEventFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="date"
//                     required
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* CONTACT */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Contact Number</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <TelephoneFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     required
//                     onChange={(e) => setContact(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* ADDRESS */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Address</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <HouseFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     required
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* ROLE */}

//               <Form.Group className="mb-3">
//                 <Form.Label>Role</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       padding: "0.375rem 0.75rem",
//                     }}
//                   >
//                     <PersonBadgeFill size={20} />
//                   </InputGroup.Text>
//                   <Form.Select
//                     required
//                     onChange={(e) => setRole(e.target.value)}
//                   >
//                     <option value="">Select Role</option>
//                     <option value="685d7c9702176fd7b0f1c7b2">User</option>
//                     <option value="685d7c7102176fd7b0f1c7af">Admin</option>
//                   </Form.Select>
//                 </InputGroup>
//               </Form.Group>

//               {/* IMAGE UPLOAD */}
//               <Form.Group className="mb-3">
//                 <Form.Label>Profile Image</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <ImageFill />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     required
//                     onChange={handleImageChange}
//                   />
//                 </InputGroup>

//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="mt-3 rounded"
//                     width="100%"
//                     style={{ maxHeight: "180px", objectFit: "cover" }}
//                   />
//                 )}
//               </Form.Group>

//               <Button
//                 type="submit"
//                 className="w-100 py-2"
//                 variant="success"
//                 style={{ fontWeight: "600" }}
//               >
//                 Sign Up
//               </Button>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>

//       <style>{`
//         .glass-modal .modal-content {
//           backdrop-filter: blur(12px);
//           background: rgba(255, 255, 255, 0.65) !important;
//           border-radius: 18px;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//         }
//       `}</style>
//     </>
//   );
// }

// export default Signup;

import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import {
  PersonFill,
  EnvelopeFill,
  KeyFill,
  TelephoneFill,
  HouseFill,
  CalendarEventFill,
  PersonBadgeFill,
  ImageFill,
} from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";

function Signup({ show, onClose }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      name,
      email,
      password,
      birthDate: date,
      contact: [contact],
      role,
      image,
      address,
    };

    try {
      // 🔹 1 — User create karo
      await axios.post("http://localhost:5000/api/v1/user/create", newUser);

      toast.success("Account created! Please verify OTP.", {
        theme: "colored",
      });

      // 🔹 2 — Temp password save karo for auto login after OTP
      localStorage.setItem("tempPassword", password);

      // 🔹 3 — OTP send karo
      await axios.post("http://localhost:5000/api/v1/otp/send", { email });

      onClose();

      // 🔹 4 — Navigate to OTP Page with email
      navigate("/otp-verification", {
        state: { email },
      });
    } catch (err) {
      console.error(err);
      toast.error("Signup failed!", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <div
              className="d-flex justify-content-center"
              style={{ height: 200 }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <PersonFill />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <EnvelopeFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <KeyFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* DOB */}
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <CalendarEventFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Contact */}
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <TelephoneFill />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    onChange={(e) => setContact(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <HouseFill />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Role */}
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="icon-box">
                    <PersonBadgeFill />
                  </InputGroup.Text>

                  <Form.Select
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="685d7c9702176fd7b0f1c7b2">User</option>
                    <option value="685d7c7102176fd7b0f1c7af">Admin</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>

              {/* Image */}
              <Form.Group className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <ImageFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                  />
                </InputGroup>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    width="100%"
                    className="mt-3 rounded"
                    style={{ maxHeight: 180, objectFit: "cover" }}
                  />
                )}
              </Form.Group>

              <Button type="submit" className="w-100" variant="success">
                Sign Up
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Signup;
