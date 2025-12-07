import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          {/* Company Section */}
          <Col className="col-3">
            <h5>Company</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae elit libero, a pharetra augue.
            </p>
          </Col>

          {/* Quick Links */}
          <Col className="col-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col className="col-3">
            <h5>Contact</h5>
            <p>📍 Ferozepur Road, Gulberg III, Lahore</p>
            <p>📞 0300 1 387 387</p>
            <p>✉️ evs@gmail.com</p>
            <div className="d-flex gap-2">
              <a href="#" className="text-light fs-5">
                <FontAwesomeIcon icon={["fab", "fa-twitter"]} />
              </a>
              <a href="#" className="text-light fs-5">
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </a>
              <a href="#" className="text-light fs-5">
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
              </a>
              <a href="#" className="text-light fs-5">
                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
              </a>
            </div>
          </Col>

          {/* Newsletter Section */}
          <Col className="col-3">
            <h5>Newsletter</h5>
            <p>Subscribe to our newsletter for the latest updates and news.</p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Your email"
                className="me-2"
              />
              <Button variant="success">SignUp</Button>
            </Form>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="mt-4 border-top pt-3 text-center">
          <Col>
            <p>
              © PakClassified, All Rights Reserved. Designed by{" "}
              <span className="text-info">Team EVS</span>
            </p>
            <div>
              <a href="#" className="text-light mx-2">
                Home
              </a>
              <a href="#" className="text-light mx-2">
                Cookies
              </a>
              <a href="#" className="text-light mx-2">
                Help
              </a>
              <a href="#" className="text-light mx-2">
                FAQs
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
