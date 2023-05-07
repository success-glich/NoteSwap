import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import "../styles/login.css";

import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // console.log({ email, password });
      const response = await axios.post("auth/register", {
        email,
        password,
      });
      // console.log(response.data);
      if (response.status === 200) toast.success(response?.data?.message);
      else {
        toast.error(response?.data?.message || "Error to Register");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Sign up</h3>

              <form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <button type="submit" className="shop__btn login__btn">
                  Create an Account
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
