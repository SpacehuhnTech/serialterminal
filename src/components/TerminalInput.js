import React from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const TerminalInput = (props) => {
    const [input, setInput] = React.useState('')
    const [disableSend, setDisableSend] = React.useState(false)

    const handleSend = () => {
        if (disableSend) return
        if (input.length === 0) return

        let _input = input
        setInput('')

        props.send(_input)

        //setDisableSend(true)

        // Disable send to prevent spam which leads to crashes
        /*setTimeout(() => {
            setDisableSend(false)
        }, 3000)*/

        /*if (history.commands[history.commands.length - 1] != _input) {
            setHistory({
                commands: [...history.commands, _input],
            })
        }*/
    }

    return (
        <Grid container spacing={0}>
            <Grid item sx={{
                width: 'calc(100% - 8rem)',
                paddingRight: '.5em',
            }}>
                <TextField
                    label='Input'
                    variant='outlined'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    fullWidth
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={disableSend}
                    autoFocus
                    inputRef={input => input && input.focus()}
                />
            </Grid>
            <Grid item sx={{
                width: '8rem',
            }}>
                <Button sx={{
                    height: 56,
                    color: '#fff',
                    '&.Mui-disabled': {
                        color: '#aaa'
                    },
                    '&.MuiButtonGroup-groupedTextHorizontal:not(:last-child)': {
                        borderColor: '#777'
                    }
                }}
                    variant='contained'
                    disableElevation
                    onClick={() => handleSend()}
                    disabled={disableSend}
                    fullWidth
                >Send</Button>
            </Grid>
        </Grid>
    )
}

export default TerminalInput