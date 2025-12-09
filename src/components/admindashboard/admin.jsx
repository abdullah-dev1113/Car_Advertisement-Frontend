import React from "react";
import "./admin.css";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect, Button } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAuth } from "../../components/authcontext.jsx";

export default function Dashboard({ adData }) {
  const navigate = useNavigate();

  const [editLoading, setEditLoading] = useState(false);

  // User
  const { user, setUser } = useAuth();

  // edit user info

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contact: "",
    birthDate: "",
    role: "",
    _id: "",
  });

  // Form and modal state
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    features: "",
    startsOn: "",
    endsOn: "",
    category: "",
    cityArea: "",
    type: "",
    image: "",
    status: "",
    priority: "",
    progress: "",
  });

  const [imageBase64, setImageBase64] = useState("");
  const [ads, setAds] = useState([]); // ✅ should be an array

  const [show, setShow] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const [showuser, setUserShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      console.log("parsed user:", parsedUser);

      setUser(parsedUser);

      setUserForm({
        name: parsedUser.name || "", // ✅
        email: parsedUser.email || "",
        contact: parsedUser.contact?.[0] || parsedUser.contacts?.[0] || "",
        birthDate: parsedUser.birthDate?.slice(0, 10) || "",
        role: parsedUser.role || "user",
        _id: parsedUser._id || "", // ✅ very important!
      });
    }
  }, []);

  const fetchAds = async () => {
    //http://localhost:5000/api/v1/task
    try {
      const res = await axios.get(
        "https://car-advertisement-backend.onrender.com/api/v1/task"
      );
      const data = res.data.found || [];
      console.log("fetched ads:", data);

      setAds(data);
    } catch (err) {
      console.error("error fetching tasks", err);
    }
  };

  // Fetch ads on load
  useEffect(() => {
    fetchAds();
  }, []);

  // Reset form when modal opens
  useEffect(() => {
    if (show && !selectedAd) {
      setForm({
        title: "",
        price: "",
        description: "",
        features: "",
        startsOn: "",
        endsOn: "",
        category: "",
        cityArea: "",
        type: "",
        image: "",
        status: "",
        priority: "",
        progress: "",
      });
      setImageBase64("");
    }
  }, [show, selectedAd]);

  if (!user && !localStorage.getItem("loggedInUser")) {
    return <p>No user logged in</p>;
  }

  // ---------------- Handlers ----------------

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUserShow = () => setUserShow(true);
  const handleUserClose = () => setUserShow(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (showuser) {
      setUserForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  //for post advertisment form

  const handleEditClick = (ad) => {
    setSelectedAd(ad);
    setForm({
      title: ad.Title || ad.title || "",
      price: ad.Price || ad.price || "",
      description: ad.Description || ad.description || "",
      features: ad.features || "",
      startsOn: ad.startsOn ? ad.startsOn.slice(0, 10) : "",
      endsOn: ad.endsOn ? ad.endsOn.slice(0, 10) : "",
      category: ad.category || "",
      cityArea: ad.cityArea || "",
      type: ad.type || "",
      image: ad.image || "",
      status: typeof ad.status === "object" ? ad.status._id : ad.status || "",
      priority:
        typeof ad.priority === "object" ? ad.priority._id : ad.priority || "",
      progress: ad.progress || "",
    });
    setShow(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("handlesave called");
    console.log("userForm:", userForm);
    console.log("userForm._id", userForm._id);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("no token found in localstorage.");
      toast.error("you must login again.");
      return;
    }

    const finalUserData = {
      name: userForm.name,
      email: userForm.email,
      contact: [userForm.contact],
      birthDate: userForm.birthDate,
      role:
        userForm.role && typeof userForm.role === "object"
          ? userForm.role._id
          : userForm.role,
    };
    console.log("sending to backend", finalUserData);

    try {
      //http://localhost:5000/api/v1/user/update/
      const response = await fetch(
        `https://car-advertisement-backend.onrender.com/api/v1/user/update/${userForm._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-HEADER": `Bearer ${token}`,
          },
          body: JSON.stringify(finalUserData),
        }
      );

      const data = await response.json();
      // console.log("update user response from backend", data);

      if (!response.ok) {
        if (response.status === 404) {
          toast.success("only admin can update user profile.", {
            position: "top-right",
            theme: "colored",
          });
        } else {
          toast.error("server error while updating user.");
        }

        // const errorText = await response.text(); // ✅ this is fine now
        // console.error("Backend error:", errorText);
        // alert("Server error while updating user.");
        console.error("server responded with error:", data);
        toast.error(data?.msg || "server error while updating user.");
        return;
      }
      console.log("update user response from backend", data);

      // ✅ parse JSON
      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        localStorage.setItem("token", data.token);
        toast.success("Updated successfully!", {
          position: "top-right",
          theme: "colored",
        });
        setIsEditing(false);
      } else {
        toast.error("Error updating profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        //http://localhost:5000/api/v1/task/delete/
        await axios.delete(
          `https://car-advertisement-backend.onrender.com/api/v1/task/delete/${id}`,
          {
            headers: {
              "X-AUTH-HEADER": ` Bearer ${token}`,
            },
          }
        );
        setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
        Swal.fire("Deleted!", "Your ad has been deleted.", "success");
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // remove only current user
    setUser(null);
    toast.success("Logged out successfully!", {
      position: "top-right",
      theme: "colored",
    });
    navigate("/"); // redirect to homepage
  };

  const handleAdSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true); //spinner start
    const token = localStorage.getItem("token");

    const adData = {
      title: form.title,
      price: Number(form.price),
      description: form.description,
      features: form.features,
      startsOn: form.startsOn ? new Date(form.startsOn) : null,
      endsOn: form.endsOn ? new Date(form.endsOn) : null,
      category: form.category,
      cityArea: form.cityArea,
      type: form.type,
      image: form.image,
      status: form.status,
      priority: form.priority,
      progress: form.progress,
    };

    try {
      if (selectedAd) {
        // ✅ Update ad
        const res = await axios.put(
          //http://localhost:5000/api/v1/task/update/
          `https://car-advertisement-backend.onrender.com/api/v1/task/update/${selectedAd._id}`,
          adData,
          {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-HEADER": `Bearer ${token}`,
            },
          }
        );

        toast.success("Ad updated successfully!", {
          position: "top-right",
          theme: "colored",
        });
      } else {
        // ✅ Create new ad
        const res = await axios.post(
          //http://localhost:5000/api/v1/task/create
          "https://car-advertisement-backend.onrender.com/api/v1/task/create",
          adData,
          {
            headers: {
              "Content-Type": "application/json",
              "X-AUTH-HEADER": `Bearer ${token}`,
            },
          }
        );
        toast.success("Advertisment posted!", {
          position: "top-right",
          theme: "colored",
        });
      }

      setSelectedAd(null);

      setForm({
        title: "",
        price: "",
        description: "",
        features: "",
        startsOn: "",
        endsOn: "",
        category: "",
        cityArea: "",
        type: "",
        image: "",
        status: "",
        priority: "",
        progress: "",
      });

      setShow(false);

      // ✅ Refresh and reset
      fetchAds(); // latest ad laa kar ui refresh karo
    } catch (err) {
      console.error(
        "Error in ad create/update:",
        err.response?.data || err.message
      );
      toast.error("Failed to post or update advertisement.");
    } finally {
      setEditLoading(false); //spinner stop
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">User Dashboard</div>

      <div className="dashboard-content">
        {/* Sidebar */}

        <Modal show={showuser} onHide={handleUserClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="userEditForm" onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label">name</label>
                <input
                  type="text"
                  name="name"
                  value={userForm.name || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">email</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="number"
                  name="contact"
                  value={userForm.contact || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of birth</label>
                <input
                  type="date"
                  name="birthDate"
                  value={userForm.birthDate || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <label className="form-label">Role</label>
                <select
                  name="role"
                  value={userForm.role || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <Modal.Footer>
                <button
                  className="btn btn-danger "
                  type="button"
                  onClick={handleUserClose}
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>

        <div className="admin-container">
          <div
            className="profile-info"
            style={{
              margin: "10px",
              width: "30%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <img src={user.image} className="profile-img" alt="Profile" />
            <p className="text-success centered fs-4">{user.name}</p>
            <p>
              <span className="fw-bolder">Email :</span> {user.email}
            </p>
            <p>
              <span className="fw-bolder">Contact Number :</span>{" "}
              {user.contact?.[0]}{" "}
            </p>
            <p>
              <span className="fw-bolder">Birth Date :</span>{" "}
              {user.birthDate?.slice(0, 10)}{" "}
            </p>
            <p>
              <span className="fw-bolder">Address :</span> {user.address}
            </p>
            <button onClick={handleUserShow} className="btn btn-success">
              Edit Info
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
            >
              Logout
            </button>
          </div>
          {/* Main Content */}
          <div className="ads-section">
            <h3>Posted Advertisements</h3>
            <Row>
              <div className="m-2 mt-3">
                <Col className="Col-4">
                  {ads.map((ad, index) => (
                    <div key={ad._id} className="card mb-4 shadow-sm">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={ad.image}
                            alt={ad.Title}
                            className="img-fluid rounded-start"
                            style={{
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title fw-bold">
                              {ad.Title || ad.title}
                            </h5>

                            <p
                              className="card-text text-muted"
                              style={{
                                maxHeight: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {ad.description || ad.Description}
                            </p>

                            <p className="card-text mb-1">
                              <strong>Price : </strong>
                              {ad.price || ad.Price}
                            </p>

                            <p className="card-text mb-2">
                              <strong>City Area :</strong> {ad.cityArea}
                            </p>

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-danger me-2"
                                onClick={() => handleDelete(ad._id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-warning me-2"
                                onClick={() => {
                                  handleEditClick(ad); // set ad for editing
                                  // handleShow(); // show modal
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-success"
                                onClick={() => navigate(`/car/${ad._id}`)}
                              >
                                View More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Col>
              </div>
            </Row>
          </div>
          {/* edit profile */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Advertisment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editLoading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "200px",
                  }}
                >
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <form
                  className="border p-4 rounded shadow-sm"
                  onSubmit={handleAdSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      name="description"
                      value={form.description || ""}
                      onChange={handleChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Features</label>
                    <textarea
                      name="features"
                      value={form.features || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3 d-flex gap-3">
                    <div>
                      <label className="form-label">Starts On</label>
                      <input
                        type="date"
                        name="startsOn"
                        value={form.startsOn || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label className="form-label">Ends On</label>
                      <input
                        type="date"
                        name="endsOn"
                        value={form.endsOn || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="mb-3 d-flex gap-3">
                    <select
                      name="category"
                      value={form.category || ""}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Vehicles">Vehicles</option>
                      <option value="Jobs">Jobs</option>
                    </select>

                    <select
                      name="cityArea"
                      value={form.cityArea || ""}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select City Area</option>
                      <option value="Downtown">Downtown</option>
                      <option value="Suburbs">Suburbs</option>
                    </select>

                    <select
                      name="type"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Type</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Progress (%)</label>
                    <input
                      type="number"
                      name="progress"
                      min="0"
                      max="100"
                      value={form.progress || ""}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter progress (0-100)"
                    />
                  </div>

                  <button className="btn btn-primary" onClick={handleClose}>
                    Cancel
                  </button>
                  <button className="btn btn-primary m-4" type="submit">
                    Save
                  </button>
                </form>
              )}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
