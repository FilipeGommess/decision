import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h2'>Decision Test</Typography>
      <Outlet />
    </Box>
  );
}
