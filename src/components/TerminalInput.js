import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const TerminalInput = (props) => {
    //const [disableSend, setDisableSend] = React.useState(false)

    return (
        <Grid container spacing={0}>
            <Grid item sx={{
                width: 'calc(100% - 8rem)',
                paddingRight: '.5em',
            }}>
                <TextField
                    label='Input'
                    variant='outlined'
                    onChange={(e) => props.setInput(e.target.value)}
                    value={props.input}
                    fullWidth
                    onKeyDown={(e) => e.key === 'Enter' && props.send()}
                    //disabled={disableSend}
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
                    onClick={() => props.send()}
                    //disabled={disableSend}
                    fullWidth
                >Send</Button>
            </Grid>
        </Grid>
    )
}

TerminalInput.propTypes = {
    input: PropTypes.string,
    setInput: PropTypes.func,
    send: PropTypes.func,
}

export default TerminalInput