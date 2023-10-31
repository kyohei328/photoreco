import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'

const Router = () => {
  return (
    
    <Routes>
      {/* <Route path="/" element={<top />}></Route> */}
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default Router
