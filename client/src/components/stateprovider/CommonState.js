import React,{createContext, useState} from 'react'
export let LoginContext = createContext("");

const CommonState = (props) => {
    let[logininfo,setLoginInfo]=useState("");
  return (
    <div>
       <LoginContext.Provider value={{logininfo,setLoginInfo}}>
        {props.children}
    </LoginContext.Provider>
    </div>
  )
}

export default CommonState

