import LoginAndsign from "../components/modals/loginAndsign.jsx";
import Signup from "../components/modals/sign up.jsx";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function AuthModals() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {/* Buttons */}
      <Button
        variant="success"
        size="lg"
        onClick={() => setShowLogin(true)}
        className="login-btn "
      >
        Login
      </Button>

      <Button
        variant="success"
        size="lg"
        onClick={() => setShowSignup(true)}
        className="login-btn m-2"
      >
        Create Account
      </Button>

      {/* Login Modal */}
      <LoginAndsign
        show={showLogin}
        onClose={() => setShowLogin(false)}
        openSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      {/* Signup Modal */}
      <Signup show={showSignup} onClose={() => setShowSignup(false)} />
    </>
  );
}
