import React from 'react'

import Box from '@mui/material/Box'

const TerminalOutput = (props) => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            background: '#1a1a1e',
            borderRadius: '4px',
            padding: 0,
            margin: 0,
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'scroll',
            flexDirection: 'column-reverse',
            resize: 'vertical',
        }}>
            <Box sx={{
                margin: '.5rem',
                padding: 0,
                fontFamily: [
                    'Roboto Mono',
                    'monospace',
                ].join(','),
                fontWeight: 300,
            }}>
                {props.history.map((obj, i) => (
                    <span key={i} 
                    style={{
                        color: obj.type === 'output' ? '#fff' : '#618833',
                    }}>
                        {obj.msg}
                        <hr />
                        <br />
                    </span>
                ))}
            </Box>
        </Box>
    )
}

export default TerminalOutput