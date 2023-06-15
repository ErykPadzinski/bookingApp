import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './register.css'
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  
  
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const navigate = useNavigate()

  const [popup, setPopup] = useState(null);



  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://localhost:3000/api/auth/register", credentials);
     if (res.status === 200) {
      setPopup("succes")
     } else if (res.status === 409) {
      setPopup("already registered")
     }
      
    } catch(err) {
      console.log(err);
      setPopup("already registered")
    }
    
  }

  const renderPopup = () => {
    if (popup === "succes") {
      navigate("/succesRegister")
    } else if (popup === "already registered") {
      return <div className='errorDiv'> <span className='errorSpan'>Account with that username or email is already registered.</span> </div>
    }
   }
       
     



  return (
    <>
    <Navbar />
    <div className='register'>
      <div className="rContainer">
      <input 
      className='rInput' 
      placeholder='Username' 
      type="text" 
      id='username' 
      onChange={handleChange} />

      <input 
      
      className='rInput' 
      placeholder='E-mail' 
      type="text" 
      id='email'
      onChange={handleChange}
      /> 
      <input 
      
      className='rInput' 
      placeholder='Password' 
      type="password" 
      id='password' 
      onChange={handleChange} />
      <button className='rButton' onClick={handleClick}>Register</button>
      </div>
      {renderPopup()}
    </div>
      </>
  )
}
