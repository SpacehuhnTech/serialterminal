import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'

import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

const Terminal = (props) => {
    // User input from input field
    const [input, setInput] = React.useState('')

    // Currently receieved string & list of previous receieved lines
    const received = React.useRef('')
    const [history, setHistory] = React.useState([])

    React.useEffect(
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
        props.send(input)

        setHistory([
            ...history,
            {
                type: 'userInput',
                msg: input,
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
    received: PropTypes.string,
    send: PropTypes.func,
    openSettings: PropTypes.func,
    echo: PropTypes.bool,
    clearToast: PropTypes.func,
}

export default Terminal
