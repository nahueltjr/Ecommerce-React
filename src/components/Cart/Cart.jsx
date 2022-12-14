import React, { useEffect, useState } from 'react';
import "./Cart.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk, removeProductCartThunk } from '../../store/slices/cart.slice';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiSad } from 'react-icons/bi';

const Cart = ({handleClose, show}) => {

const[showModal, setShowModal]=useState(false)
  
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getCartThunk())
},[])

const cart = useSelector(state => state.Cart)

  return (
      <Offcanvas show={show} onHide={handleClose} placement="end"  scroll={true} style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='Cart_products_container'>
          <div className={`ModalCheck_${showModal ? "show":"hide"}`}>
            <div className='ModalCheck'>
                <p>Succesfull Purchase!</p>
                <button onClick={()=>setShowModal(false)}>Ok</button>
            </div>
          </div>
            {
              cart.map(product=>(
                <div key={product.id} className="Cart_product">
                  <div className='Cart_product_detail'>
                    <h3>{product.title}</h3>
                    <div className='Cart_product_detail_price'>
                      <p>{product.productsInCart.quantity}</p>
                      <p>x</p>
                      <p>$ {product.price}</p>
                      <div className='Cart_subtotal'>
                      <p>Subtotal</p> 
                      <span>$ {product.productsInCart.quantity * product.price}</span>
                      </div>
                    </div>
                  </div>
                <div className='Cart_product_delete'>
                  <button onClick={()=>dispatch(removeProductCartThunk(product.id))} className='Cart_product_delete_btn'><BsFillTrashFill/></button>
                </div>
                </div>
              ))
            }
          </div>
          
          {cart.length > 0 ?
            <div className='Cart_checkout'>
              <div className='Cart_checkout_details'>
                <p>Total:</p>
                <p>
                  $
                  {
                    cart.reduce((acc,product)=>acc + Number(product.price)*product.productsInCart.quantity,0)
                  }
                </p>
              </div>
              <button onClick={()=>dispatch(checkoutCartThunk(setShowModal)) }>Checkout</button>
            </div>
          :
            <div className='Empty_cart'>
              <span><BiSad/></span>
              <p>Empty cart!</p>
            </div>
          }
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;