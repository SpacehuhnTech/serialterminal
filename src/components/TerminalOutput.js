import React from 'react'

import Box from '@mui/material/Box'

const TerminalOutput = (props) => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            background: '#202124',
            borderRadius: '4px',
            padding: 0,
            margin: 0,
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'scroll',
            flexDirection: 'column-reverse',
            resize: 'vertical',
            '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#555',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-corner': {
                background: 'transparent',
                borderRadius: '4px',
            },
            '&::-webkit-resizer': {
                display: 'none',
            },
        }}>
            <code style={{
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
                            color: obj.type === 'userInput' ? '#fbbc05' : '#e8eaed',
                            fontWeight:  obj.type === 'userInput' ? '700' : '300',
                        }}>
                        {obj.msg}
                        {obj.type === 'userInput' && <hr />}
                        <br />
                    </span>
                ))}
            </code>
        </Box>
    )
}

export default TerminalOutput