import React from 'react'
import Box from '@mui/material/Box'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Terminal from './components/Terminal'

function App() {
  const [connected, setConnected] = React.useState(false)
  const [history, setHistory] = React.useState([])

  const connect = () => {
    setConnected(true)
  }

  const send = (str) => {
    const newHistory = [...history, {
      type: 'input',
      msg: str,
    }]

    setHistory(newHistory)
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
          history={history}
          send={send}
        />
      }

      <Footer />
    </Box>
  );
}

export default App