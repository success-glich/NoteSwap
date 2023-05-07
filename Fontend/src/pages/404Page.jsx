import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

const PageNotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h1>Oops!</h1>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="shop__btn btn mb-5">Go to Home Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
