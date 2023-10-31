import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// import { css } from '@emotion/react'
import  Router from './router/Router'


// const Styles = ({
//   heightstyle: css ({
//     height: '69vh',
//   })
// })


function App(): JSX.Element {

  return (
    <MantineProvider>
      <Header/>
        <div>
          {/* <h1  css={Styles.heightstyle} className="text-3xl font-bold underline">Hello world!</h1> */}
          <Router/>
        </div>
      <Footer />
    </MantineProvider>
  )
}

export default App


// import { Amplify } from 'aws-amplify';

// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import './assets/style.css';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

// export default function App() {
//   return (
//     <div class="auth-screen">
//       <div class="auth-form">
//         {/* <Authenticator socialProviders={['google']}> */}
//         <Authenticator>
//           {({ signOut, user }) => (
//             <main>
//               <h1>Hello {user.username}</h1>
//               <button onClick={signOut}>Sign out</button>
//             </main>
//           )}
//         </Authenticator>
//       </div>
//     </div>
//   );
// }

