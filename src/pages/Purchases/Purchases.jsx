import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchasesThunk } from '../../store/slices/purchases.slice'
import "./Purchases.css"

export const Purchases = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPurchasesThunk())
  },[])

  const purchases = useSelector(state => state.Purchases)

  return (
    <div className='Purchases'>
      {
        purchases.map(purchase => (
          purchase.cart.products.map(product=>(
            <div key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p>{product.createdAt}</p>
            </div>
          ))    
        ))
      }
    </div>
  )
}
