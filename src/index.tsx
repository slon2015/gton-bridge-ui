import React from 'react'
import ReactDOM from 'react-dom/client'
import '@src/index.css'
import App from '@src/App'
import reportWebVitals from '@src/reportWebVitals'
import { MetaMaskProvider } from 'metamask-react'
import { Provider } from 'react-redux'
import { store } from '@src/state/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MetaMaskProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
