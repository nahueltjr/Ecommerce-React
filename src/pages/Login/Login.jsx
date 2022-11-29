import React from 'react'
import "./Login.css"
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate()

  const {handleSubmit, register} = useForm()

  const onSubmit = data =>{
    axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
    .then(res => navigate("/"))
    .catch(err => {
      if(err.response?.status === 404){
          alert("Credeciales incorrectas")
      }else{
        console.log(err.response?.data);
      }
    })
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} placeholder='Email'/>
        </div>
        <div>
          <input {...register("password")} placeholder='Password'/>
        </div>
        <button>Sign in</button>   
      </form>
    </div>
  )
}
