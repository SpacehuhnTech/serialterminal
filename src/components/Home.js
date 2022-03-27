import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import ChromeIcon from '../icons/Chrome'
import EdgeIcon from '../icons/Edge'
import OperaIcon from '../icons/Opera'

const gridCSS = {
    height: 'calc(100vh - 160px)',
    minHeight: '10em',
}

const Home = (props) => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={gridCSS}
        >

            <Grid item xs={3}>

                {props.supported() ?
                    <Button variant='contained' color='success' size='large' onClick={props.connect}>
                        Connect
                    </Button>
                    :
                    <Alert severity='warning'>
                        <AlertTitle>Your browser doesn&apos;t support Web Serial 😭</AlertTitle>
                        Try using&nbsp;
                        <a href='https://www.google.com/chrome/' target='blank'>
                            <ChromeIcon fontSize='inherit' /> <b>Chrome</b>
                        </a>
                        ,&nbsp;
                        <a href='https://www.microsoft.com/en-us/edge' target='blank'>
                            <EdgeIcon fontSize='inherit' /> <b>Edge</b>
                        </a>
                        , or&nbsp;
                        <a href='https://www.opera.com/' target='blank'>
                            <OperaIcon fontSize='inherit' /> <b>Opera</b>
                        </a>
                        <br />
                        (IOS & Android browsers are not supported)
                        <br />
                        <br />
                        Learn more about&nbsp;
                        <a href='https://developer.mozilla.org/en-US/docs/Web/API/Serial#browser_compatibility' target='blank'>
                            browser compatibility
                        </a>
                    </Alert>
                }
            </Grid>

        </Grid>
    )
}

Home.propTypes = {
    connect: PropTypes.func,
    supported: PropTypes.func,
}

export default Home