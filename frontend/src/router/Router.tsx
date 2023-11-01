import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Top from '../components/Top'

const Router = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Top />}></Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default Router
