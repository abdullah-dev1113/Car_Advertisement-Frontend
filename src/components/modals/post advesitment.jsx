// import React, { useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Spinner from "react-bootstrap/Spinner";
// import { useNavigate } from "react-router-dom";

// function PostAdForm({ onNewAd }) {
//   const [show, setShow] = useState(false);

//   const [statusList, setStatusList] = useState([]);
//   const [priorityList, setPriorityList] = useState([]);

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     features: "",
//     startDate: "", // Changed
//     endDate: "", // Changed
//     category: "",
//     cityArea: "",
//     type: "",
//     image: "",
//     status: "",
//     priority: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [statusRes, priorityRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/v1/status"),
//           axios.get("http://localhost:5000/api/v1/priority"),
//         ]);
//         console.log("fetched status list:", statusRes.data.Found);
//         console.log("fetched priority list:", priorityRes.data.Found);

//         setStatusList(statusRes.data.Found); // ✅ Assuming res.data.data is array
//         setPriorityList(priorityRes.data.Found);
//       } catch (err) {
//         console.error("Failed to fetch status or priority:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm((prev) => ({ ...prev, image: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // spinner start
//     // Validation
//     if (!form.name || !form.price || !form.description) {
//       alert("Please fill required fields");
//       return;
//     }

//     const postData = {
//       ...form,
//       price: Number(form.price),
//       startsOn: form.startDate ? new Date(form.startDate) : null,
//       endsOn: form.endDate ? new Date(form.endDate) : null,
//       status: form.status,
//       priority: form.priority,
//       progress: 0,
//     };

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "http://localhost:5000/api/v1/task/create",
//         postData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-AUTH-HEADER": `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Post created!", {
//         position: "top-right",
//         theme: "colored",
//       });
//       onNewAd();
//       setForm({
//         name: "",
//         price: "",
//         description: "",
//         features: "",
//         startDate: "",
//         endDate: "",
//         category: "",
//         cityArea: "",
//         type: "",
//         image: "",
//         status: "",
//         priority: "",
//       });
//       handleClose();
//       navigate("/Dashboard");
//     } catch (error) {
//       console.error(error);
//       toast.error("Error creating post");
//     } finally {
//       setLoading(false); // spinner stop
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="success"
//         onClick={handleShow}
//         style={{
//           marginLeft: "90px",
//           padding: "8px",
//           fontSize: "18px",
//           marginTop: "-3px",
//         }}
//       >
//         Post Advertisment
//         <FontAwesomeIcon className="ms-2" icon={faArrowRight} />
//       </Button>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-success fs-3">
//             Post Advertisment
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             maxHeight: "none",
//             overflowY: "visible",
//             height: "auto",
//           }}
//         >
//           {loading ? (
//             <div
//               className="d-flex justify-content-center align-items-center"
//               style={{
//                 height: "200px",
//               }}
//             >
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : (
//             <form className="rounded" onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Description</label>
//                 <textarea
//                   type="text"
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Features</label>
//                 <textarea
//                   name="features"
//                   value={form.features}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>

//               <div className="mb-3 d-flex gap-3">
//                 <div>
//                   <label className="form-label">Starts On</label>
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={form.startDate}
//                     onChange={handleChange}
//                     className="form-control "
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">Ends On</label>
//                   <input
//                     type="date"
//                     name="endDate"
//                     value={form.endDate}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mb-3 d-flex gap-3">
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Real Estate">Real Estate</option>
//                   <option value="Vehicles">Vehicles</option>
//                   <option value="Jobs">Jobs</option>
//                 </select>

//                 <select
//                   name="cityArea"
//                   value={form.cityArea}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select City Area</option>
//                   <option value="Downtown">Downtown</option>
//                   <option value="Suburbs">Suburbs</option>
//                 </select>

//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Sale">Sale</option>
//                   <option value="Rent">Rent</option>
//                 </select>
//               </div>

//               <div className="mb-3 d-flex gap-3">
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select Status</option>
//                   {(statusList || []).map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   name="priority"
//                   value={form.priority}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select Priority</option>
//                   {(priorityList || []).map((p) => (
//                     <option key={p._id} value={p._id}>
//                       {p.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="form-control"
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary">
//                 Post Advertisement
//               </button>
//             </form>
//           )}
//         </Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default PostAdForm;

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function PostAdForm({ onNewAd }) {
  const [show, setShow] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    startDate: "",
    endDate: "",
    category: "",
    cityArea: "",
    type: "",
    image: "",
    status: "",
    priority: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, priorityRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/status"),
          axios.get("http://localhost:5000/api/v1/priority"),
        ]);

        setStatusList(statusRes.data.Found);
        setPriorityList(priorityRes.data.Found);
      } catch (err) {
        console.error("Failed to fetch status or priority:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.price || !form.description) {
      alert("Please fill required fields");
      return;
    }

    const postData = {
      ...form,
      price: Number(form.price),
      startsOn: form.startDate ? new Date(form.startDate) : null,
      endsOn: form.endDate ? new Date(form.endDate) : null,
      progress: 0,
    };

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/v1/task/create", postData, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-HEADER": `Bearer ${token}`,
        },
      });

      toast.success("Post created!", {
        position: "top-right",
        theme: "colored",
      });

      onNewAd();
      setForm({
        name: "",
        price: "",
        description: "",
        features: "",
        startDate: "",
        endDate: "",
        category: "",
        cityArea: "",
        type: "",
        image: "",
        status: "",
        priority: "",
      });
      setImagePreview(null);

      handleClose();
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{
          marginLeft: "90px",
          padding: "10px 18px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
      >
        Post Advertisement
        <FontAwesomeIcon className="ms-2" icon={faArrowRight} />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-success fs-3 fw-bold">
            Create Advertisement
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ maxHeight: "80vh", overflowY: "auto", padding: "25px" }}
        >
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "250px" }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* SECTION 1 - BASIC INFO */}
              <h5 className="mt-3 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Basic Information
              </h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">Ad Title *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="e.g. Toyota Corolla for Sale"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter price"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                  rows={3}
                  placeholder="Write details here..."
                />
              </div>

              {/* SECTION 2 - FEATURES */}
              <h5 className="mt-4 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Additional Features
              </h5>

              <div className="mb-3">
                <textarea
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  placeholder="Optional features"
                />
              </div>

              {/* SECTION 3 - DATES */}
              <h5 className="mt-4 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Active Duration
              </h5>

              <div className="mb-3 d-flex gap-3">
                <div className="flex-fill">
                  <label className="form-label fw-semibold">Starts On *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="flex-fill">
                  <label className="form-label fw-semibold">Ends On *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {/* SECTION 4 - CATEGORY */}
              <h5 className="mt-4 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Category & Type
              </h5>

              <div className="mb-3 d-flex gap-3">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Jobs">Jobs</option>
                </select>

                <select
                  name="cityArea"
                  value={form.cityArea}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">City Area</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Suburbs">Suburbs</option>
                </select>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Type</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              {/* SECTION 5 - STATUS */}
              <h5 className="mt-4 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Status & Priority
              </h5>

              <div className="mb-3 d-flex gap-3">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Status</option>
                  {statusList.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Priority</option>
                  {priorityList.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION 6 - IMAGE */}
              <h5 className="mt-4 mb-2 fw-bold border-start border-3 border-primary ps-2">
                Upload Image
              </h5>

              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>

              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </div>
              )}

              {/* SUBMIT */}
              <div className="d-flex justify-content-end mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  style={{ padding: "10px 22px", fontSize: "16px" }}
                >
                  {loading ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    "Post Advertisement"
                  )}
                </Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostAdForm;
