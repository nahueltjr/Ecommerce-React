import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import {AiOutlineUser} from "react-icons/ai"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoBagHandleOutline} from "react-icons/io5"
import Cart from '../Cart/Cart'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export const Navbar = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const token = localStorage.getItem("token")

  const handleShow = () => {
    if(token){
      setShow(!show)
    }
    else{
      navigate("/login")
    }
  }
  const counter = useSelector(state=>state.Cart)
  
  const variants = {
    open: {rotate:[0,10,-10,10,-10,10,-10,0,0,10,-10,10,-10,10,-10,0], scale:[1,1.3,1]},
    closed: { rotate: 0 }
  }

  return (
    <header className='Navbar_container'>
        <div className='Navbar_logo'>
            <h2><Link to="/">Ecommerce</Link></h2> 
        </div>
        <nav className='Navbar_menu'>
            <ul>
                <li><Link to="/purchases"><IoBagHandleOutline/></Link></li>
                <motion.li
                animate={counter.length > 0 ? "open" : "closed"}
                variants={variants}
                transition={{delay:.5,duration:1.2,repeat:1.5}}
                className='Li_cart_count'onClick={handleShow}><Link><AiOutlineShoppingCart/></Link>{counter.length > 0?<span className='Cart_count'>{counter.length}</span>:""}</motion.li>
                <li><Link to="/login"><AiOutlineUser/></Link></li>
            </ul>
        </nav>
        <Cart handleClose={handleClose} show={show}/>
    </header>
  )
}
