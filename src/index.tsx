import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components/macro'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from './styles/ThemeProvider'
import { theme } from './styles/theme'
import { reset } from './styles/reset'
import { ChatScreen } from './containers/ChatScreen'

const GlobalStyle = createGlobalStyle`
  #root{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex: 1 1 auto;
  }

  ${reset}
`

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <ChatScreen />
            </>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
