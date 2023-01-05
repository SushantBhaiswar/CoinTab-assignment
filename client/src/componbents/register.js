import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./mix.css"
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import url from "../configur/keys"


export default function Register() {
    const history = useNavigate()
    const [showpass, setShowpass] = useState(false)
    const [cshowpass, setCshowpass] = useState(false)
    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const setval = (e) => {
        let { name, value } = e.target
        setInpval({ ...inpval, [name]: value })
    }
    const onsubmit = async (e) => {
        e.preventDefault()
        let { fname, email, password, cpassword } = inpval
        if (fname === "") {
            toast.warning("fname is required!", {
                position: "top-right"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-right"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-right"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-right"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-right"
            });
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-right"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-right"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-right"
            });
        } else {
            let res = await axios.post(`${url.baseUrl}/register`, inpval)
                .catch((err) => {
                    toast.error(err.response.data)
                })

            if (res.status === 200) {
                toast.success("Registration Successful !")
                history("/")

                setInpval({
                    fname: "",
                    email: "",
                    password: "",
                    cpassword: ""
                })
            }
        }
    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Register</h1>
                        <p style={{ textAlign: 'right' }}>We are glad that you will be using Project Cloudto manage<br />
                            your tasks! We hope that you will get like it.</p>
                    </div>
                    <form >
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name='fname' value={inpval.fname} onChange={setval} id='fname'
                                placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' value={inpval.email} onChange={setval} id='email'
                                placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showpass ? "password" : "text"} value={inpval.password}
                                    onChange={setval} name='password' id='password'
                                    placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => { setShowpass(!showpass) }}>
                                    {!showpass ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cshowpass ? "password" : "text"} value={inpval.cpassword}
                                    onChange={setval} name='cpassword' id='cpassword'
                                    placeholder='Confirm Password' />
                                <div className="showpass" onClick={() => { setCshowpass(!cshowpass) }}>
                                    {!cshowpass ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={onsubmit}>Register</button>
                        <Link to={"/"}>
                            <p>Already Have an account? Login</p>
                        </Link>

                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}
