import React from 'react'
import '../styles/cart.css';
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container,Row,Col } from 'reactstrap';

import tdImg from '../assets/images/arm-chair-01.jpg';
import {motion} from "framer-motion";
import {addItem} from "../redux/slices/cartSlice";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Cart = () => {

  const totalAmount= useSelector(state=>state.cart.totalAmount);

  const {cartItem} = useSelector(state=>state.cart);
  console.log(cartItem);
  return (
    <Helmet  title= 'Cart'>

      <CommonSection title={'Shopping Cart'} />
      <section>
        <Container>
          <Row>
            <Col lg='9' >

              {
                cartItem.length===0? <h2>No items added to the cart</h2>:(

                          <table className='table bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      cartItem.map((item,index)=>(
                        <tr key={index}>
                        <td>
                          <img src={item.imgUrl} alt="" />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}pc</td>
                        <td><motion.i whileTap={{scale:1.2}} className="ri-delete-bin-line"></motion.i></td>
                      </tr>
                      ))
                    }
               
                </tbody>
              </table>
              )  
              }

            </Col>
            <Col lg ='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal
                <span className={"fs-4 fw-bold"}>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>Taxes and shopping will calculate in checkout</p>
              <div>
                <button className="shop__btn w-100"><Link to='/checkout'>Checkout</Link></button>
                <button className="shop__btn w-100"><Link to='/shop'>Continue Shopping</Link></button>
              </div>
            </Col>

          </Row>
        </Container>

      </section>
    </Helmet>
  )
}

export default Cart