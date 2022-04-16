import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'

import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

const Terminal = (props) => {
    // User input from input field
    const [input, setInput] = React.useState('')

    // Currently receieved string
    const received = React.useRef('')

     // List of received lines
    const [history, setHistory] = React.useState([])

    React.useEffect(
        () => {
            const str = `${received.current}${props.received.value}`
            const lines = str.split('\n')

            let newReceived = str
            const newLines = []

            if (lines.length > 1) {
                newReceived = lines.pop()

                lines.forEach(line => {
                    newLines.push({
                        type: 'output',
                        value: `${line}`,
                        time: props.received.time,
                    })
                })
            }
            setHistory((current) => current.concat(newLines))
            received.current = newReceived
        },
        [props.received],
    )

    const handleSend = () => {
        props.send(input)

        setHistory([
            ...history,
            {
                type: 'userInput',
                value: input,
                time: new Date(),
            },
        ])
        setInput('')
    }

    return (
        <Grid container spacing={1} sx={{
            padding: '.75em',
        }}>
            { /* Terminal Window */}
            <Grid item xs={12}>
                <TerminalOutput
                    history={history}
                    setHistory={setHistory}
                    setInput={setInput}
                    openSettings={props.openSettings}
                    echo={props.echo}
                    time={props.time}
                    clearToast={props.clearToast}
                />
            </Grid>

            { /* Input Field & Send Button */}
            <Grid item xs={12}>
                <TerminalInput
                    input={input}
                    setInput={setInput}
                    send={handleSend}
                />
            </Grid>
        </Grid>
    )
}

Terminal.propTypes = {
    received: PropTypes.object,
    send: PropTypes.func,
    openSettings: PropTypes.func,
    echo: PropTypes.bool,
    time: PropTypes.bool,
    clearToast: PropTypes.func,
}

export default Terminal
