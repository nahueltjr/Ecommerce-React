import React, { useState } from 'react'
import {AiOutlineUser} from "react-icons/ai"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoBagHandleOutline} from "react-icons/io5"
import {BiSearchAlt} from "react-icons/bi"
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { filterNameProductsThunk } from '../../store/slices/products.slice'
import { useDispatch } from 'react-redux'

export const Navbar = () => {

  const dispatch = useDispatch()

  const [inputSearch, setInputSearch] = useState("")

  return (
    <header className='Navbar_container'>
        <div className='Navbar_logo'>
            <h2><Link to="/">Ecommerce</Link></h2> 
        </div>
        <div className='Navbar_input'>
          <form onSubmit={()=>dispatch(filterNameProductsThunk(inputSearch))}>
            <input type="text" value={inputSearch} onChange={e=>setInputSearch(e.target.value)} placeholder='Search product'/>
            <button><BiSearchAlt/></button>
          </form>
        </div>
        <nav className='Navbar_menu'>
            <ul>
                <li><Link to="/cart"><AiOutlineShoppingCart/></Link></li>
                <li><Link to="/purchases"><IoBagHandleOutline/></Link></li>
                <li><Link to="/login"><AiOutlineUser/></Link></li>
            </ul>
        </nav>
    </header>
  )
}
