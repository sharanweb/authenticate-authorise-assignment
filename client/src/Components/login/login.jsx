import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./login.css"
function Login() {
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    function handleChange(e){
        setUser({
            ...user,
            [e.target.id]:e.target.value
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(user)
        try {
            await fetch("https://localhost:8080/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }).then(async(res)=>{
                console.log(res);
                if(res.status===200){
                    navigate("/products")
                }
                if(res.status===400){
                    alert("Invalid credentials")
                    console.log("yes")
                }
            })
        } catch (error) {
            alert("Invalid credantials")
        }
    }
  return (
    <div className='login'>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
            <input className='input' id="email" onChange={handleChange} type="email" placeholder='Email'/>
            <input className='input' id="password" onChange={handleChange} type="password" placeholder='Password'/>
            <input id="button" type="submit" />
        </form>
    </div>
  )
}

export default Login