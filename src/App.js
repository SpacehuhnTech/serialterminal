import React from 'react'

import Box from '@mui/material/Box'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Terminal from './components/Terminal'

import Serial from './modules/Serial'

function App() {
  const [serial] = React.useState(new Serial())
  const [connected, setConnected] = React.useState(false)
  const [received, setReceived] = React.useState('')
  
  const connect = () => {
    if (!serial.supported()) {
      //setNoSupportOpen(true)
      console.error(`Serial not supported`)
      return
    }

    serial.onSuccess = () => {
      setConnected(true)
      //setPopUp({ open: true, severity: 'success', value: 'Connected 🚀' })
    }

    serial.onFail = () => {
      setConnected(false)
      //setPopUp({ open: true, severity: 'error', value: 'Lost connection 🙀' })
    }

    serial.onReceive = (value) => {
      setReceived(`${value}`)
      //console.log(value)
    }

    serial.requestPort()
  }

  const disconnect = () => {
    serial.close()
    setConnected(false)
  }

  return (
    <Box>
      <Header />

      {!connected &&
        <Home
          connect={connect}
        />
      }

      {connected &&
        <Terminal
          received={received}
          send={(str) => serial.send(str)}
        />
      }

      <Footer />
    </Box>
  );
}

export default App