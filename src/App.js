import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import Header from './components/Header'

import version from './version.js'

function App() {
  return (
    <Box>
      <Header/>

      { /* Made in Germany :D */}
      <Box sx={{ mx: 'auto', mt: 5 }}>
        <Typography
          align='center'
          display='block'>
          Made with ❤️ by <Link href='https://spacehuhn.com' target='_blank' underline='hover' color='inherit'>Spacehuhn</Link>
        </Typography>
      </Box>

      { /* Version */}
      <Typography
        variant='caption'
        align='center'
        display='block'
        sx={{ color: '#ddd' }}>
        {version.name}
      </Typography>
    </Box>
  );
}

export default App