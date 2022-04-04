import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import ChromeIcon from '../icons/Chrome'

const ErrorMessage = (props) => {

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Connection failed</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>

                <Typography sx={{ mt: 2 }}>
                    Looks like something went wrong 😢<br />
                    We recommend using the latest version of&nbsp;
                    <a href='https://www.google.com/chrome/' target='blank'>
                        <ChromeIcon fontSize='inherit' /> <b>Chrome</b>
                    </a> for desktop.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.close} color='primary'>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

ErrorMessage.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    message: PropTypes.string,
}

export default ErrorMessage