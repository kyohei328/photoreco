import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Top from '../components/Top'
import PrivacyPolicy from '../components/PrivacyPolicy'
import TermsOfUse from '../components/TermsOfUse'
import AddPhoto from '../components/AddPhoto'
import AddContest from '../components/AddContest'
import AddContestConfirm from '../components/AddContestConfirm'
import IndexPhotos from '../components/IndexPhotos'
import ContestTop from '../components/ContestTop'
import ShowContest from '../components/ShowContest'
import ShowPhoto from '../components/ShowPhoto'
import Mypage from '../components/Mypage'
import ContestResult from '../components/ContestResult'
import SearchMap from '../components/SearchMap'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
      <Route path="/terms-of-use" element={<TermsOfUse />}/>
      <Route path="/photos/new" element={<AddPhoto />}/>
      <Route path="/photos/:id" element={<ShowPhoto />}/>
      <Route path="/photos/map" element={<SearchMap />}/>
      <Route path="/contest/top" element={<ContestTop />}/>
      <Route path="/contest/new" element={<AddContest />}/>
      <Route path="/contest/:id" element={<ShowContest/>}/>
      <Route path="/contest/new/confirm" element={<AddContestConfirm />}/>
      <Route path="/contest/:id/result" element={<ContestResult />}/>
      <Route path="/photos" element={<IndexPhotos />}/>
      <Route path="/mypage" element={<Mypage />}/>
      
    </Routes>
  )
}

export default Router
