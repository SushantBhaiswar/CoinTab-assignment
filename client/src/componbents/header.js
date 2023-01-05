import React, { useContext } from 'react'
import "./header.css"
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import { Logincontext } from '../App';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import url from "../configur/keys"


export default function Header() {
    const { logindata, setLogindata } = useContext(Logincontext)

    const history = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = async () => {
        console.log("called");
        let token = localStorage.getItem("userdatatoken");

        await axios.post(`${url.baseUrl}/logout`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .catch((err) => {
                console.log(err);
                if (err.response.data.status === 401 || !err) {
                    history("*");
                }
            })

            .then(() => {

                localStorage.removeItem("userdatatoken")
                setLogindata(false)
                history("/");
            })
    }
    return (
        <>
            <header>
                <nav>
                    <h1>Cointab</h1>
                    <div className="avatar">
                        {
                            logindata ?
                                <Avatar style={{ background: "salmon" }} onClick={handleClick}>{logindata[0].toUpperCase()}
                                </Avatar> : <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
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
                            logindata ? (
                                <>
                                    <MenuItem onClick={() => {
                                        const goDash = () => {
                                            history("/dash")
                                        }
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        Logout()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        const err = () => { toast.error("Login to see Profile Page !") }
                                        err()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>

                </nav>
            </header>
            <ToastContainer position="top-right" />
        </>
    )
}
