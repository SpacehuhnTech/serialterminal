import React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import HistoryIcon from '@mui/icons-material/History'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SettingsIcon from '@mui/icons-material/Settings'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import TerminalIcon from '@mui/icons-material/Terminal'

import './TerminalOutput.css'

const TerminalOutput = (props) => {
    // User input history window
    const [historyOpen, setHistoryOpen] = React.useState(false)

    const handleClear = () => {
        props.clearToast()
        props.setHistory([])
    }

    return (
        <pre className='terminalOutput'>

            { /* Buttons */}
            <ButtonGroup variant='text' className='terminalButtons'>

                { /* Clear */}
                <Button onClick={handleClear}>
                    <HighlightOffIcon color='inherit' />
                </Button>

                { /* History */}
                <Button onClick={() => setHistoryOpen(true)}>
                    <HistoryIcon color='inherit' />
                </Button>

                { /* Settings */}
                <Button onClick={props.openSettings}>
                    <SettingsIcon color='inherit' />
                </Button>
            </ButtonGroup>

            { /* Text */}
            <Box className='codeContainer'>
                <code>
                    {props.history.filter(line => (line.type === 'output' || props.echo)).map((line, i) => (
                        <p key={i}>
                            <span className='time'>{props.time && `${line.time.toTimeString().substring(0, 8)} `}</span>
                            <span className={line.type}>{line.value}</span>
                        </p>
                    ))}
                </code>
            </Box>

            { /* History Popup */}
            <Dialog
                open={historyOpen}
                onClose={() => setHistoryOpen(false)}
            >
                <DialogTitle>
                    History
                </DialogTitle>
                <List sx={{ minWidth: '10em' }}>
                    {props.history.filter(line => line.type === 'userInput').map((line, i) => (
                        <ListItem button key={i} onClick={() => {
                            props.setInput(line.value)
                            setHistoryOpen(false)
                        }}>
                            <ListItemIcon>
                                <TerminalIcon />
                            </ListItemIcon>
                            <ListItemText primary={line.value} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>

        </pre>
    )
}

TerminalOutput.propTypes = {
    history: PropTypes.array,
    setHistory: PropTypes.func,
    setInput: PropTypes.func,
    openSettings: PropTypes.func,
    echo: PropTypes.bool,
    time: PropTypes.bool,
    clearToast: PropTypes.func,
}

export default TerminalOutput