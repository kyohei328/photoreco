import './App.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Header } from './components/Header';
import { css } from '@emotion/react'
import  Router from './router/Router'




function App(): JSX.Element {

  const Styles = ({
    heightstyle: css ({
      // height: '100vh',
      height: '100%',
    })
  })
  

  return (
    <MantineProvider>
      <Header/>
        <div css={Styles.heightstyle}>
          <Router/>
        </div>
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

