
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { css } from '@emotion/react'

const Styles = ({
  heightstyle: css ({
    height: '69vh',
  })
})


function App(): JSX.Element {

  return (
    <MantineProvider>
      <Header/>
        <div>
          <h1  css={Styles.heightstyle} className="text-3xl font-bold underline">Hello world!</h1>
        </div>
      <Footer />
    </MantineProvider>
  )
}

export default App