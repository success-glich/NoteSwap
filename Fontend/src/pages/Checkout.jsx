import React from 'react'
import { Container,Row, Col,Form, FormGroup } from 'reactstrap'
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection"
import "../styles/checkout.css";
import { useSelector } from 'react-redux';

const Checkout = () => {
  const {totalQuantity,totalAmount} = useSelector(state=>state.cart);
  return (
    <Helmet title="checkout">
      <CommonSection title={"Checkout"} />

      <Container>
        <Row>
          <Col lg='8'>
            <h6 className='mb-4 fw-bold'>Billing Information</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Enter your name' />

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your email' />

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="number" placeholder='Phone Number' />

              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Street address' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='City' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='postal code' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='country' />
              </FormGroup>
              
              
            </Form>
          </Col>
          <Col lg='4'>
            <div className="checkout__cart mt-5">
              <h6>Total Qty: <span>{totalQuantity} items</span></h6>
              <h6>Subtotal: <span>${totalAmount}</span></h6>
              <h6><span> Shipping: <br /> Free Shipping</span><span>$0</span></h6>
              <h6>Free Shipping</h6>
              <h4>Total Cost: <span>${totalAmount}</span></h4>
              <button className="shop__btn auth__btn w-100">Place an order</button>
            </div>
            
          </Col>
        </Row>
      </Container>

    </Helmet>
  )
}

export default Checkout