import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './stateprovider/CommonState';


const Dashboard = () => {
    let{logininfo,setLoginInfo} = useContext(LoginContext);
      console.log(logininfo)
    let history = useNavigate();
    let dashBoardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        let data = await res.json();
        if (data.status === 401 || !data) {
            history("*")
        }
        else {
            console.log("user verified")
            setLoginInfo(data)
            history("/dash")
        }
    }



    useEffect(() => {
        dashBoardValid();

    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="https://tse2.mm.bing.net/th?id=OIP.28jmE4s4hgzuaJnqvGffRQHaHa&pid=Api&P=0&h=220" alt='logo' style={{ marginTop: "20px", display: "flex" }}></img>
            <h1>user Email:{logininfo ? logininfo.validuserone.email:""}</h1>
        </div>
    )
}

export default Dashboard;
