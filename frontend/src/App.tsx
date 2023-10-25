
import './App.css'
import { Link } from "react-router-dom"
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header';

function App(): JSX.Element {

  return (
     <MantineProvider>
      <Header/>
        <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
      </MantineProvider>
      
  )
}

export default App