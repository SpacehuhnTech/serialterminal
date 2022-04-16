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
import TerminalIcon from '@mui/icons-material/Terminal';

const preCSS = {
    position: 'relative',
    height: 'calc(100vh - 200px)',
    minHeight: '10em',
    padding: '0',
    margin: '0',
}

const buttonGroupCSS = {
    position: 'absolute',
    right: 0,//'1em',
    top: 0,//'1em',
    margin: 0,
    padding: 0,
    background: 'rgba(32, 33, 36, .6)',
    color: '#fff',
}

const buttonCSS = {
    color: '#fff',
    '&.Mui-disabled': {
        color: '#aaa'
    },
    '&.MuiButtonGroup-groupedTextHorizontal:not(:last-child)': {
        borderColor: '#777'
    }
}

const boxCSS = {
    height: '100%',
    width: '100%',
    background: '#202124',
    borderRadius: '4px',
    padding: 0,
    margin: 0,
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'scroll',
    flexDirection: 'column-reverse',
    resize: 'vertical',
    '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#555',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
        borderRadius: '4px',
    },
    '&::-webkit-resizer': {
        display: 'none',
    },
}

const codeCSS = {
    margin: '.5rem',
    padding: 0,
    fontFamily: [
        'Roboto Mono',
        'monospace',
    ].join(','),
    fontWeight: 300,
}

const lineCSS = {
    'output': {
        color: '#fff'
    },
    'userInput': {
        color: '#fbbc05',
        fontWeight: 700,
        display: 'block',
        borderBottom: '1px solid',
    }
}

const TerminalOutput = (props) => {
    // User input history window
    const [historyOpen, setHistoryOpen] = React.useState(false)

    const handleClear = () => {
        props.clearToast()
        props.setHistory([])
    }

    return (
        <pre style={preCSS}>

            { /* Buttons */}
            <ButtonGroup variant='text' sx={buttonGroupCSS}>

                { /* Clear */}
                <Button sx={buttonCSS} onClick={handleClear}>
                    <HighlightOffIcon color='inherit' />
                </Button>

                { /* History */}
                <Button sx={buttonCSS} onClick={() => setHistoryOpen(true)}>
                    <HistoryIcon color='inherit' />
                </Button>

                { /* Settings */}
                <Button sx={buttonCSS} onClick={props.openSettings}>
                    <SettingsIcon color='inherit' />
                </Button>
            </ButtonGroup>

            { /* Text */}
            <Box sx={boxCSS}>
                <code style={codeCSS}>
                    {props.history.filter(line => (line.type === 'output' || props.echo)).map((line, i) => (
                        <span key={i} style={lineCSS[line.type]}>
                            {props.time && `${line.time.toTimeString().substring(0, 8)} `}
                            {line.value}
                            <br />
                        </span>
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