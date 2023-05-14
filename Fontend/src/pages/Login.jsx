import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { login } from "../redux/slices/userSlice";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserData } from "../redux/slices/userSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("auth/login", {
        email,
        password,
      });
      console.log(response.success);
      if (response.data.success === false) {
        toast.error("Authentication Failed");
        return;
      }

      if (response?.status === 200) {
        dispatch(setUserData(response.data));
        toast.success("Login successfully");
        localStorage.setItem("access_token", response.data.token);
        navigate(redirectPath, { replace: true });
      } else {
        toast.error("Authentication Failed");
      }
    } catch (err) {
      toast.error("Authentication Failed ");
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>

              <Form className="auth__form" onSubmit={handleSubmit}>
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
                    required
                  />
                </FormGroup>
                <button type="submit" className="shop__btn login__btn">
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
