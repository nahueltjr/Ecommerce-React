import React, { useEffect, useState, useRef } from 'react'
import "./Products.css"
import ProductsCard from '../../components/ProductCard/ProductCards'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductsThunk } from '../../store/slices/products.slice'
import SliderImgs from './SliderImgs'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsDot} from "react-icons/bs"
import { addToCartThunk } from '../../store/slices/cart.slice'
import { motion } from 'framer-motion'

export const Products = () => {
  const productsList = useSelector(state => state.Products)
  const dispatch = useDispatch()
  const {id} =useParams()
  const navigate= useNavigate()
  const token = localStorage.getItem("token")

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])

  const product = productsList.find(product=> product?.id === Number(id))
  const relatedProducts = productsList.filter(p => p.category?.name === product?.category?.name && p.id !== product.id)

  const[counter, setCounter]=useState(1)
  const[catchErr, setCatchErr]=useState(false)
  const[showModal, setShowModal]=useState(false)
  const addProduct = () =>{
    if(token){
      const data = {id:Number(id), quantity:counter}
      dispatch(addToCartThunk(data,setCatchErr))
    }
    else{navigate("/login")}
  }
  
  useEffect(()=>{
    if(catchErr){
        setShowModal(true)
    }
  },[catchErr])

  const productSection = useRef(null);
  const goToTop = () => {
    window.scrollTo({
        top: productSection,
        behavior: "smooth",
  })
  }

  return (
    <section className='Product'>
        <div className={`Modal_${showModal ? "show":"hide"}`}>
          <div className='Modal'>
              <p>Product Already added, please try another!</p>
              <button onClick={()=>setShowModal(false)}>Ok</button>
          </div>
        </div>
        <span className='Return_link'><Link to="/">Home</Link><BsDot/>{product?.title}</span>
        <div className='Product_detail' ref={productSection}>
        <div className="Slider_container">
          { product && <SliderImgs product={product}/> }
        </div>
        <div className='Product_detail_description'>

          <h4>{product?.title}</h4>

          <div className="Price">
            <span>Price</span>
            <span>Quantity</span>
            <p>$ {product?.price}</p>
            <div className="Add_btns">
                <button onClick={()=>{if(counter > 1){setCounter(counter -1)}}}>-</button>
                <p>{counter}</p>
                <button onClick={()=>{if(counter >= 1){setCounter(counter +1)}}}>+</button>
            </div>
          </div>
          
          <div className="AddCart_btn">
            <button onClick={addProduct}>Add to cart <AiOutlineShoppingCart/></button>
          </div>
          
          <p>{product?.description}</p>
        </div>
      </div>

      <h3 className='Discover'>Discover similar products</h3>

      <div className='Related_products'>
        {
          relatedProducts.map(rp => (
            <div key={rp.id}>
              <ProductsCard product={rp} onClick={goToTop()}/>
            </div>
          ))
        }
      </div>
    </section>
  )
}
