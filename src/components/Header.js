import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Header = () => {
    return (
        <AppBar
            position='static'
            sx={{
                background: '#2c387e',
            }}
        >
            <Toolbar>
                <img
                    src='logo768.png'
                    alt='Logo'
                    height='30px'
                />

                <Typography
                    variant='h6'
                    component='h1'
                    noWrap
                    sx={{ 
                        flexGrow: 1,
                        fontFamily: 'Bungee',
                    }}
                >
                    &nbsp;Serial Terminal
                </Typography>

                <Button
                    //variant='contained'
                    //color='success'
                    sx={{ color: '#fff' }}
                    href='https://ko-fi.com/spacehuhn'
                    target='_blank'
                    startIcon={<FavoriteIcon />}>
                    Say Thanks
                </Button>

                <Button
                    sx={{ color: '#fff' }}
                    target='_blank'
                    href='#'
                >
                    <AddBoxIcon/>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header