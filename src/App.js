import React from 'react'

import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Terminal from './components/Terminal'
import Settings from './components/Settings'
import ErrorMessage from './components/ErrorMessage'

import Serial from './modules/Serial'
import { setCookie, getCookie } from './modules/cookie.js'

const saveSettings = (settings) => {
  setCookie('settings', JSON.stringify(settings), 365)
}

const loadSettings = () => {
  let settings = {
    baudRate: 115200,
    lineEnding: '\\r\\n',
    echoFlag: true,
  }

  const cookieValue = getCookie('settings')

  try {
    const cookieJSON = JSON.parse(cookieValue)

    if ('baudRate' in cookieJSON) settings.baudRate = cookieJSON.baudRate
    if ('lineEnding' in cookieJSON) settings.lineEnding = cookieJSON.lineEnding
    if ('echoFlag' in cookieJSON) settings.echoFlag = cookieJSON.echoFlag
  } catch (e) {
    console.error(e)
  }

  saveSettings(settings)
  return settings
}

function App() {
  // Serial Module
  const [serial] = React.useState(new Serial())

  // Connection Flag
  const [connected, setConnected] = React.useState(false)

  // Receive Buffer
  const [received, setReceived] = React.useState('')

  // Connect/Disconnect Toast Open
  const [toast, setToast] = React.useState({ open: false, severity: 'info', value: '' })

  // Settings Window Open
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  // Error Window
  const [errorOpen, setErrorOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  // Settings
  const settings = loadSettings()
  const [baudRate, setBaudRate] = React.useState(settings.baudRate)
  const [lineEnding, setLineEnding] = React.useState(settings.lineEnding)
  const [echoFlag, setEchoFlag] = React.useState(settings.echoFlag)

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

    serial.requestPort().then(res => {
      if (res !== '') {
        setErrorMessage(res)
        setErrorOpen(true)
      }
    })
  }
  /*
  const disconnect = () => {
    serial.close()
    setConnected(false)
  }*/

  const handleSend = (str) => {
    const map = {
      'None': '',
      '\\r': '\r',
      '\\n': '\n',
      '\\r\\n': '\r\n',
    }

    serial.send(`${str}${map[lineEnding]}`)
  }

  const handleSave = () => {
    serial.setBaudRate(baudRate)

    saveSettings({
      baudRate: baudRate,
      lineEnding: lineEnding,
      echoFlag: echoFlag
    })
  }

  return (
    <Box>
      {/* Header */}
      <Header />

      {/* Homepage or Terminal */}
      {connected ?
        <Terminal
          received={received}
          send={handleSend}
          openSettings={() => setSettingsOpen(true)}
          echo={echoFlag}
          clearToast={() => setToast({ open: true, severity: 'info', value: 'History cleared 🧹' })}
        />
        :
        <Home
          connect={connect}
          supported={serial.supported}
          openSettings={() => setSettingsOpen(true)}
        />
      }

      {/* Settings Window */}
      <Settings
        open={settingsOpen}
        close={() => setSettingsOpen(false)}
        baudRate={baudRate}
        setBaudRate={setBaudRate}
        lineEnding={lineEnding}
        setLineEnding={setLineEnding}
        echoFlag={echoFlag}
        setEchoFlag={setEchoFlag}
        save={handleSave}
        openPort={connected}
        saveToast={() => setToast({ open: true, severity: 'success', value: 'Settings saved ✨' })}
      />

      {/* (Dis)connected Toast */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={closeToast}>
        <Alert onClose={closeToast} severity={toast.severity}>
          {toast.value}
        </Alert>
      </Snackbar>

      {/* Error Message Window */}
      <ErrorMessage
        open={errorOpen}
        close={() => setErrorOpen(false)}
        message={errorMessage}
      />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default App