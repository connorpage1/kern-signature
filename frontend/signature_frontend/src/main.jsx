import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <ChakraProvider theme={theme}>
        <Toaster />
        <App />
      </ChakraProvider >
    </>
  </StrictMode>,
)
