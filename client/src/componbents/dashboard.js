import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Logincontext } from '../App'
import url from "../configur/keys"

export default function Dashboard() {
    const { logindata, setLogindata } = useContext(Logincontext)
    // console.log(logindata);
    const history = useNavigate()
    const DashboardValid = async () => {
        let token = localStorage.getItem("userdatatoken");

        await axios.post(`${url.baseUrl}/gettoken`, {
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

            .then((res) => {
                setLogindata(res.data.ValiduserOne.email)
                // history("/dash");
            })
    }

    useEffect(() => {
        DashboardValid();
    },)
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                <h1> Email: {logindata}</h1>
            </div>
        </>

    )
}
