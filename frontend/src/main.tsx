import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'tailwindcss/tailwind.css'
import './assets/fonts.css'
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import { AuthContextProvider } from './context/AuthContext';
import { ImageContextProvider } from './context/TodayPhotosContext';
import { CategoryContextProvider } from './context/Category.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  {/* <React.StrictMode> */}
    {/* <AuthProvider> */}
    <AuthContextProvider>
      <ImageContextProvider>
        <CategoryContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </CategoryContextProvider>
      </ImageContextProvider>
    </AuthContextProvider>
      {/* </AuthProvider> */}
  {/* </React.StrictMode>, */}
  </>
)
