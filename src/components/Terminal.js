import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import HistoryIcon from '@mui/icons-material/History'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import TerminalIcon from '../icons/Terminal'

const Terminal = (props) => {
    // User input from input field
    const [input, setInput] = React.useState('')

    // Currently receieved string & list of previous receieved lines
    const received = React.useRef('')
    const [history, setHistory] = React.useState([])
    
    // User input history
    const [historyOpen, setHistoryOpen] = React.useState(false)
    const [historyAvailable, setHistoryAvailable] = React.useState(false)
    
    useEffect(
        () => {
            const str = `${received.current}${props.received}`
            const lines = str.split('\n')

            let newReceived = str
            const newLines = []

            if (lines.length > 1) {
                newReceived = lines.pop()

                lines.forEach(line => {
                    newLines.push({
                        type: 'output',
                        msg: `${line}`,
                    })
                })
            }
            setHistory((current) => current.concat(newLines))
            received.current = newReceived
        },
        [props.received],
    )

    const handleSend = () => {
        props.send(`${input}\n`)

        setHistory([
            ...history,
            {
                type: 'userInput',
                msg: input,
            },
        ])
        setInput('')
        setHistoryAvailable(true)
    }

    return (
        <Grid container spacing={1} sx={{
            padding: '.75em',
        }}>
            { /* Main Window */}
            <Grid item xs={12}>
                <pre style={{
                    position: 'relative',
                    height: 'calc(100vh - 200px)',
                    minHeight: '10em',
                    padding: '0',
                    margin: '0',
                }}>
                    { /* History Button */}

                    {historyAvailable &&
                        <Button
                            sx={{
                                position: 'absolute',
                                left: 0,//'.65em',
                                top: 0,//'.65em',
                                margin: 0,
                                padding: '.25em',
                                background: 'rgba(32, 33, 36, .6)',
                                color: '#fff',
                                minWidth: 0,
                            }}
                            onClick={() => setHistoryOpen(true)}
                        >
                            <HistoryIcon color='inherit' />
                        </Button>
                    }

                    { /* Terminal Window */}
                    <TerminalOutput
                        history={history}
                    />

                </pre>
            </Grid>

            { /* Input Field & Send Button */}
            <Grid item xs={12}>
                <TerminalInput
                    input={input}
                    setInput={setInput}
                    send={handleSend}
                />
            </Grid>

            { /* History Popup */}
            <Dialog
                open={historyOpen}
                onClose={() => setHistoryOpen(false)}
                sx={{
                    minWidth: '200px',
                }}
            >
                <DialogTitle>
                    Command History
                </DialogTitle>
                <List>
                    {history.filter(line => line.type === 'userInput').map((line, i) => (
                        <ListItem button key={`${line.msg}${i}`} onClick={() => {
                            setInput(line.msg)
                            setHistoryOpen(false)
                        }}>
                            <ListItemIcon>
                                <TerminalIcon />
                            </ListItemIcon>
                            <ListItemText primary={line.msg} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </Grid>
    )
}

export default Terminal
