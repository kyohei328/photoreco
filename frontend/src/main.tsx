import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'tailwindcss/tailwind.css'
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import { AuthContextProvider } from './context/AuthContext';
import { ImageContextProvider } from './context/TodayPhotosContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  {/* <React.StrictMode> */}
    {/* <AuthProvider> */}
    <AuthContextProvider>
      <ImageContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ImageContextProvider>
    </AuthContextProvider>
      {/* </AuthProvider> */}
  {/* </React.StrictMode>, */}
  </>
)
