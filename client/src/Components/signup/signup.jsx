import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./signup.css"
function Signup() {
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    function handleChange(e){
        setUser({
            ...user,
            [e.target.id]:e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(user)
        fetch("https://localhost:8000/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
    }
  return (
    <div className='signup'>
        <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
            <input className='input' id="name" onChange={handleChange} type="text" placeholder='Name'/>
            <input className='input' id="email" onChange={handleChange} type="email" placeholder='Email'/>
            <input className='input' id="password" onChange={handleChange} type="password" placeholder='Password'/>
            <input className='button' type="submit" />
        </form>
        <br />
        <div>
            <p>Already User?: </p>
            <Link to={"/login"}>
            <span>Click Here</span>
            </Link>
            
        </div>
    </div>
  )
}

export default Signup