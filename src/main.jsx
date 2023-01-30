import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
      <Layout>
        <App />
      </Layout>
    </React.StrictMode>
  </ChakraProvider>,
)
