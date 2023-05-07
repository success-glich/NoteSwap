import React from "react";
import { Form, FormGroup, Row, Col, Container } from "reactstrap";

const AllNotes = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Add Category</h4>
            <Form>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span> Category title</span>
                  <input type="text" placeholder="BCA " />
                </FormGroup>
                <FormGroup className="form__group w-50 ">
                  <span> Category title</span>
                  <input type="text" placeholder="BCA" />
                </FormGroup>
              </div>
              <button className="shop__btn btn">Add Category</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllNotes;
