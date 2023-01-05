import Header from "./componbents/header";
import Login from "./componbents/login";
import Register from "./componbents/register";
import Dashboard from "./componbents/dashboard"
import Error from "./componbents/error";
import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"


export const Logincontext = createContext()

function App() {
  const [logindata, setLogindata] = useState("")
  return <>
    <Logincontext.Provider value={{ logindata, setLogindata }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Logincontext.Provider>
  </>
}
export default App;
