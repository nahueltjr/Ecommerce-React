import React, { useState } from 'react'
import "./Login.css"
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {AiFillEyeInvisible} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"
import {FaUserCircle} from "react-icons/fa"
import {FiMail} from "react-icons/fi"
import {CgLockUnlock} from "react-icons/cg"
import {BsDot} from "react-icons/bs"

export const Login = () => {

  const navigate = useNavigate()
  const {handleSubmit, register, formState: { errors }} = useForm()
  const[showPassword, setShowPassword]=useState(false)
  const [showErr, setShowErr]= useState("hide")

  const onSubmit = data =>{
    axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
    .then(res => {
      navigate("/")
      console.log(res);
      localStorage.setItem("token", res.data.data.token)
      localStorage.setItem("userFirstName", res.data.data.user.firstName)
      localStorage.setItem("userLastName", res.data.data.user.lastName)
    })
    .catch(err => {
      if(err.response?.status === 404){
          setShowErr("show")
      }else{
        console.log(err.response?.data);
      }
    })
  }

  const token = localStorage.getItem("token")
  const logout = () =>{
    localStorage.removeItem("token")
    navigate("/login")
  }

  const firstName = localStorage.getItem("userFirstName")
  const lastName = localStorage.getItem("userLastName")

  return (
    <div className='Login_container'>
      <div className='Return_link_login'>
        <span ><Link to="/">Home</Link><BsDot/>Purchases</span>
      </div>
      {!token ? 
        <div className='Login'>
            <div>
              <h4>Welcome! Enter your email and password to continue</h4>
              <div className='Test_data'>
                <h5>Test data</h5>
                <p><FiMail/> nahuel@gmail.com</p>
                <p><CgLockUnlock/> nahuel1234</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="Login_form">
              <div className='Form_input'>
                <input type="text" {...register("email", { required: true})} placeholder='Email' autoComplete='off'/>
                {
                errors.email && <span className='Err_msg'>Check your email.</span>
                } 
              </div>
              <div className='Form_input'>
                <input type={showPassword?"text":"password"} {...register("password", { required: true})} placeholder='Password' autoComplete='off'/>
                <span onClick={()=>setShowPassword(!showPassword)} className='Password_icon'>{showPassword?<AiFillEye/>:<AiFillEyeInvisible/>}</span>
                {
                errors.password && <span className='Err_msg'>Check your password.</span>
                }
              </div>
              <button className='Login_btn'>Login</button>  
            </form>
            <span className={`Err_404_${showErr}`}>Credenciales incorrectas, vuelve a intentarlo.</span>
        </div>
      :
        <div className='Logout'>
          <div className='Profile_logout'>
            <span><FaUserCircle/></span>
            <p>Welcome, {firstName} {lastName}.</p>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      }  
    </div>
  )
}
