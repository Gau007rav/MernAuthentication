import React, { useState } from 'react'
import { NavLink } from "react-router-dom"

import "./mix.css"
const Register = () => {
    let [passShow, setPassShow] = useState(false);
    let [cpassShow, setCPassShow] = useState(false);
    let [inputVal, setInputVal] = useState({
        fname: "",
        email: "",
        password: "",
        Cpassword: ""

    })
  
    let setVal = (e) => {
        let {name,value}=e.target;
        setInputVal(()=>{
            return{
                ...inputVal,
                [name]:value
            }
        })
    }

    let addUserData = async(e) =>{
        e.preventDefault();
        let{fname,email,password,Cpassword}=inputVal;
        if(fname===""){
            alert("enter your name");
        }
        else if(email === ""){
            alert("enter your email")
        }
        else if(!email.includes("@")){
            alert("enter valid mail")
        }
        else if(password ===""){
            alert("enter your password")
        }
        else if(password.length<6){
            alert("password must be 6 character")
        }
        else if(Cpassword===""){
            alert("enter your password again")
        }
        else if(Cpassword<6){
            alert("Cpassword must be 6 character")
        }
        else if(password!== Cpassword){
            alert("password and confirm password are not matched")
        }
        else{
           // console.log("user registration successfully done")
           let data = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,password,Cpassword
            })
           })
           let res = await data.json();
           //console.log(res)
           if(res.status==201){
            alert("registration done");
            setInputVal({...inputVal,fname:"",email:"",password:"",Cpassword:""})
           }
        }
    }
    return (
        <div>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p>We are glad you are using our App !!!</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' name='fname' id='fname' placeholder='enter your Name' value={inputVal.fname} onChange={setVal}></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' placeholder='enter your email address' value={inputVal.email} onChange={setVal}></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} name='password' id='password' value={inputVal.password} placeholder='enter your password' onChange={setVal}></input>
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
                            </div>

                        </div>
                        <div className='form_input'>
                            <label htmlFor='Cpassword'>Confirm Password</label>
                            <div className='two'>
                                <input type={!cpassShow ? "password" : "text"} name='Cpassword' id='Cpassword' value={inputVal.Cpassword} placeholder='enter your password again' onChange={setVal}></input>
                                <div className='showpass' onClick={() => setCPassShow(!cpassShow)}>{!cpassShow ? "Show" : "Hide"}</div>
                            </div>

                        </div>
                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Login</NavLink></p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register
