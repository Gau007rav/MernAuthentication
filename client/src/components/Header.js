import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './stateprovider/CommonState';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { useNavigate } from 'react-router-dom';
const Header = () => {
  let { logininfo, setLoginInfo } = useContext(LoginContext);
  let history = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
        console.log("use logout");
        localStorage.removeItem("usersdatatoken");
        setLoginInfo(false)
        history("/");
    } else {
        console.log("error");
    }
}

let goDash = () => {
    history("/dash")
}
  

  const goError = () => {
    history("*")
  }
  return (
    <div>
      <header>
        <nav>
          <h1>GK cloud</h1>
          <div className='avtar'>

            {logininfo.validuserone ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logininfo.validuserone.fname[0].toUpperCase()}</Avatar> :
              <Avatar style={{ background: "blue" }} onClick={handleClick} />}

          </div>
          <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                       open={open}
                        onClose={handleClose}
                        MenuListProps={{
                           'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logininfo.validuserone ? (
                                <div>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </div>
                            )
                        }
          </Menu>
        </nav>
      </header>
    </div>
  )
}

export default Header
