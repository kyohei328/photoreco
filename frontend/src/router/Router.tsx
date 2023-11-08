import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Top from '../components/Top'
import PrivacyPolicy from '../components/PrivacyPolicy'
import TermsOfUse from '../components/TermsOfUse'
import AddPhoto from '../components/AddPhoto'
import AddContest from '../components/AddContest'
import AddContestConfirm from '../components/AddContestConfirm'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
      <Route path="/terms-of-use" element={<TermsOfUse />}/>
      <Route path="/photos/new" element={<AddPhoto />}/>
      <Route path="/contest/new" element={<AddContest />}/>
      <Route path="/contest/new/confirm" element={<AddContestConfirm />}/>
    </Routes>
  )
}

export default Router
