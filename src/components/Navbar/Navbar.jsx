import React, { useState } from 'react'
import {AiOutlineUser} from "react-icons/ai"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoBagHandleOutline} from "react-icons/io5"
import "./Navbar.css"
import Cart from '../Cart/Cart'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
  

  return (
    <header className='Navbar_container'>
        <div className='Navbar_logo'>
            <h2><Link to="/">Ecommerce</Link></h2> 
        </div>
        <nav className='Navbar_menu'>
            <ul>
                <li><Link to="/purchases"><IoBagHandleOutline/></Link></li>
                <li className='Li_cart_count'onClick={handleShow}><Link><AiOutlineShoppingCart/></Link> {counter.length > 0?<span className='Cart_count'>{counter.length}</span>:""}</li>
                <li><Link to="/login"><AiOutlineUser/></Link></li>
            </ul>
        </nav>
        <Cart handleClose={handleClose} show={show}/>
    </header>
  )
}
