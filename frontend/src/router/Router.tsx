import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Top from '../components/Top'
import PrivacyPolicy from '../components/PrivacyPolicy'
import TermsOfUse from '../components/TermsOfUse'
import AddPhoto from '../components/AddPhoto'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
      <Route path="/terms-of-use" element={<TermsOfUse />}/>
      <Route path="/photos/new" element={<AddPhoto />}/>
    </Routes>
  )
}

export default Router
