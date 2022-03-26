import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const Home = (props) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                height: 'calc(100vh - 160px)',
                minHeight: '10em',
            }}
        >
            <Grid item xs={3}>
                <Button variant='contained' color='success' size='large' onClick={props.connect}>
                    Connect
                </Button>
            </Grid>

        </Grid>
    )
}

Home.propTypes = {
    connect: PropTypes.func,
}

export default Home