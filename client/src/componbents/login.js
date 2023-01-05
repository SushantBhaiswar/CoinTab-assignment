import React, { useState } from 'react'
import "./mix.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login() {
    let history = useNavigate()
    const [showpass, setShowpass] = useState(false)
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    const setval = (e) => {
        let { name, value } = e.target
        setInpval({ ...inpval, [name]: value })
    }
    const onsubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inpval
        // console.log(inpval);
        if (!email)
            toast.error("Email is required !")
        else if (!password)
            toast.error("password is required !")
        else {
            let res = await axios.post("http://localhost:3001/login", inpval)
                .catch((err) => {
                    toast.error(err.response.data);
                })
            // console.log(res);
            if (res.status === 200) {
                toast.success("Login successfully")
                localStorage.setItem("userdatatoken", res.data.token)
                history("/dash")
            }
        }
    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you back. Please login.</p>
                    </div>
                    <form >
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setval} value={inpval.email} name='email' id='email'
                                placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showpass ? "password" : "text"} onChange={setval} value={inpval.password}
                                    name='password' id='password'
                                    placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => { setShowpass(!showpass) }}>
                                    {!showpass ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={onsubmit}>Login</button>
                        <Link to={"/register"}>
                            <p>Don't have an accout? Sign Up</p>
                        </Link>
                    </form>
                </div>
            </section>
            <ToastContainer position="top-right" />

        </>
    )
}
