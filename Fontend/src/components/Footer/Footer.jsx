import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import { Link } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>NoteSwap</h1>
                {/* <p>Since 1995</p> */}
              </div>
            </div>
            <p className="footer__text mt-4">
              Welcome to our notes sharing community, where knowledge meets
              creativity! Share your notes with fellow learners, collaborate on
              projects, and expand your horizons with a diverse community of
              like-minded individuals. From science to literature, and
              everything in between, let's embark on a journey of lifelong
              learning together.
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick-links-title">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#"> BCA</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#"> BSCSIT</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Class 10</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#"> Learning Book</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer__quick-links">
              <h4 className="quick-links-title">UseFull Link</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/note"> Note</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/favorite"> Favorite</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login"> Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#"> Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick-links-title"> Contact</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line "></i>
                    <p>123, MangalBazar, Lalitpur, Nepal</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                    <p>+977-9808862324</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                    <p>iamsaphal21@gmail.com</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <Link to="#"> Smart Notes</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year} developed by Success Ghorasaini. All rights
              reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
