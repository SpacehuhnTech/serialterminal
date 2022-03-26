import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'

import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

const Terminal = (props) => {
    const [tmp, setTmp] = React.useState('')
    const [history, setHistory] = React.useState([])

    useEffect(
        () => {
            const str = `${tmp}${props.received}`
            const lines = str.split('\n')

            let newTmp = str
            const newLines = [...history]

            if (lines.length > 1) {
                newTmp = lines.pop()

                lines.forEach(line => {
                    newLines.push({
                        type: 'output',
                        msg: `${line}`,
                    })
                })
            }

            setHistory(newLines)
            setTmp(newTmp)
        },
        [props.received],
    )

    const handleSend = (msg) => {
        props.send(msg)

        setHistory([
            ...history,
            {
                type: 'userInput',
                msg: msg,
            },
        ])
    }

    return (
        <Grid container spacing={1} sx={{
            padding: '.75em',
        }}>

            { /* Output Terminal View */}
            <Grid item xs={12} sx={{
                position: 'relative',
                height: 'calc(100vh - 190px)',
                minHeight: '10em',
            }}>
                <TerminalOutput
                    history={history}
                />
            </Grid>

            { /* Input Field & Send Button */}
            <Grid item xs={12}>
                <TerminalInput
                    send={handleSend}
                />
            </Grid>
        </Grid>
    )
}

export default Terminal
