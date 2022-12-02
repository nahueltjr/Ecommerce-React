import React, { useEffect } from 'react';
import "./Cart.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk, removeProductCartThunk } from '../../store/slices/cart.slice';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaRegSadTear } from 'react-icons/fa';

const Cart = ({handleClose, show}) => {
  
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getCartThunk())
},[])

const cart = useSelector(state => state.Cart)

  return (
      <Offcanvas show={show} onHide={handleClose} placement="end"  scroll={true} style={{marginTop:"70px",boxShadow: "rgba(0, 0, 0, .2) 0px 0px 10px, rgba(0, 0, 0, 0.2) 0px 0px 10px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='Cart_products_container'>
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
              <button onClick={()=>dispatch(checkoutCartThunk()) }>Checkout</button>
            </div>
          :
            <div className='Empty_cart'>
              <span><FaRegSadTear/></span>
              <p>Empty cart!</p>
            </div>
          }
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;