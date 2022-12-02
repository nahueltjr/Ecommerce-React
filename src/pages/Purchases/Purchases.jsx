import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchasesThunk } from '../../store/slices/purchases.slice'
import "./Purchases.css"
import {BsDot} from "react-icons/bs"
import { Link } from 'react-router-dom'

export const Purchases = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPurchasesThunk())
  },[])

  const purchases = useSelector(state => state.Purchases)

  return (
    <div className='Purchases'>
      <div className='Return_link_purchase'>
        <span ><Link to="/">Home</Link><BsDot/>Purchases</span>
      </div>
      { purchases.length > 0 ?
        purchases.map(purchase => (
          purchase.cart.products.map(product=>(
            <div key={product.id} className="Purchase_container">
              <div className='Purchase_date'>
                <p>Date: {product.productsInCart.createdAt.slice(0, 10)}</p>
              </div>
              <div className='Purchase_detail'>
                <div className="Purchase_detail_title">
                  <p><span>Product:</span> {product.title}</p>
                </div>
                <div className="Purchase_detail_price">
                  <p><span>Quantity:</span> {product.productsInCart.quantity}</p>
                  <p><span>Price: </span>${product.price}</p>
                  <p><span>Total: </span>${Number(product.price) * product.productsInCart.quantity}</p>
                </div>
              </div>
            </div>
          ))   
        ))
      :
        <div className='No_purchases'>
          <p>You haven't bought anything yet. <Link to="/">See products</Link></p>
        </div>
      }

    </div>
  )
}
