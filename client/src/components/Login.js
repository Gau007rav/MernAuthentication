import React, { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom"
import axios from "axios"
import "./mix.css"
const Login = () => {
  let [passShow, setPassShow] = useState(false)
  let history = useNavigate()
  let [inputVal, setInputVal] = useState({
   
    email: "",
    password: ""

  })

  let setVal = (e) => {
    let { name, value } = e.target;
    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value
      }
    })
  }

  let userLogin = async (e) => {
    e.preventDefault();
    let { email, password } = inputVal
    if (email === "") {
      alert("enter your email")
    }
    else if (!email.includes("@")) {
      alert("enter valid mail")
    }
    else if (password === "") {
      alert("enter your password")
    }
    else if (password.length < 6) {
      alert("password must be 6 character")
    }
    else {
      let data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
      let res = await data.json();
      console.log(res)
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken",res.result.token)
        history("/dash")
        //console.log(res.result.token)
        setInputVal({ ...inputVal, email: "", password: "" })
      }
    
  }
}
return (
  <div>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Welcome Back, Log In</h1>
          <p>Hi, we are glad you are back. Please Login</p>
        </div>
        <form>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='enter your email address' onChange={setVal} value={inputVal.email}></input>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Password</label>
            <div className='two'>
              <input type={!passShow ? "password" : "text"} name='password' id='password' placeholder='enter your password' onChange={setVal} value={inputVal.password}></input>
              <div className='showpass' onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
            </div>

          </div>
          <button className='btn' onClick={userLogin}>Login</button>
          <p>Don't have an Account? <NavLink to="/register">Sign UP</NavLink></p>
        </form>
      </div>
    </section>
  </div>
)
}

export default Login
