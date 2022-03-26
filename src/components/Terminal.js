import React from 'react'

import Grid from '@mui/material/Grid'

import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

const Terminal = (props) => {
    return (
        <Grid container spacing={1} sx={{
            padding: '.5em',
        }}>
            { /* Output Terminal View */}
            <Grid item xs={12} sx={{
                position: 'relative',
                height: 'calc(100vh - 140px)',
                minHeight: '10em',
            }}>
                <TerminalOutput
                    history={props.history}
                />
            </Grid>

            { /* Input Field & Send Button */}
            <Grid item xs={12}>
                <TerminalInput
                    send={props.send}
                />
            </Grid>
        </Grid>
    )
}

export default Terminal
