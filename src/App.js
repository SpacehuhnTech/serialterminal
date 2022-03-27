import React from 'react'

import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Terminal from './components/Terminal'

import Serial from './modules/Serial'

function App() {
  const [serial] = React.useState(new Serial())
  const [connected, setConnected] = React.useState(false)
  const [received, setReceived] = React.useState('')
  const [toast, setToast] = React.useState({ open: false, severity: 'info', value: '' })

  const closeToast = () => {
    setToast({ ...toast, open: false })
  }

  const connect = () => {
    if (!serial.supported()) {
      //setNoSupportOpen(true)
      console.error(`Serial not supported`)
      return
    }

    serial.onSuccess = () => {
      setConnected(true)
      setToast({ open: true, severity: 'success', value: 'Connected 🚀' })
    }

    serial.onFail = () => {
      setConnected(false)
      setToast({ open: true, severity: 'error', value: 'Lost connection 🙀' })
    }

    serial.onReceive = (value) => {
      setReceived(`${value}`)
      //console.log(value)
    }

    serial.requestPort()
  }
  /*
  const disconnect = () => {
    serial.close()
    setConnected(false)
  }*/

  return (
    <Box>
      {/* Header */}
      <Header />

      {/* Homepage or Terminal */}
      {connected ?
        <Terminal
          received={received}
          send={str => serial.send(str)}
        />
        :
        <Home
          connect={connect}
        />
      }

      {/* (Dis)connected Toast */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={closeToast}>
        <Alert onClose={closeToast} severity={toast.severity}>
          {toast.value}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App