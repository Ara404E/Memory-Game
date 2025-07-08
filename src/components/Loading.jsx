import { Stack, LinearProgress, Typography, Backdrop } from '@mui/material';
import '../styles/loading/loading.css'
const Loading = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
        backgroundColor: '#FFE2E2'
      }}
    >
      <Stack sx={{ width: '50%' }} spacing={2}>
        <LinearProgress className="custom-progress" />
      </Stack>
      <Typography
        variant="h6"
        sx={{ marginTop: 2, color: 'black', fontWeight: 'bold' }}
      >
        Loading...
      </Typography>
    </Backdrop>
  );
};

export default Loading;

