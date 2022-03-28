import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const baudrates = [
    300,
    1200,
    2400,
    4800,
    9600,
    19200,
    38400,
    57600,
    74880,
    115200,
    230400,
    250000,
    500000,
    1000000,
    2000000,
]

const lineEndings = [
    'None',
    '\\n',
    '\\r',
    '\\r\\n',
]

const formElementCSS = {
    marginTop: 1,
    minWidth: '10em',
}

const Settings = (props) => {
    const reset = () => {
        if(!props.openPort) props.setBaudRate(115200)
        props.setLineEnding('\\r\\n')
        props.setEchoFlag(true)
    }

    const save = () => {
        props.save()
        props.close()
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Settings</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Serial Connection
                </DialogContentText>

                <FormControl variant='filled' fullWidth sx={formElementCSS}>
                    <InputLabel>Baud Rate {props.openPort && '(Requires Reconnect)'}</InputLabel>
                    <Select
                        value={props.baudRate}
                        onChange={(e) => props.setBaudRate(e.target.value)}
                        label='baudrate'
                        disabled={props.openPort}
                    >
                        {baudrates.map(baud =>
                            <MenuItem value={baud} key={baud}>{baud} baud</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl variant='filled' fullWidth sx={formElementCSS} >
                    <InputLabel>Line Ending</InputLabel>
                    <Select
                        value={props.lineEnding}
                        onChange={(e) => props.setLineEnding(e.target.value)}
                        label='Line Ending'
                    >
                        {lineEndings.map(name =>
                            <MenuItem value={name} key={name}>{name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox
                            checked={props.echoFlag}
                            onChange={(e) => props.setEchoFlag(e.target.checked)}
                        />
                    } label='Show input (echo)' />
                </FormGroup>

            </DialogContent>

            <DialogActions>
                <Button onClick={reset} color='error'>Reset</Button>
                <Button onClick={save}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

Settings.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    baudRate: PropTypes.number,
    setBaudRate: PropTypes.func,
    lineEnding: PropTypes.string,
    setLineEnding: PropTypes.func,
    echoFlag: PropTypes.bool,
    setEchoFlag: PropTypes.func,
    save: PropTypes.func,
    openPort: PropTypes.bool,
}

export default Settings