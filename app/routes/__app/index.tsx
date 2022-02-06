import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from '~/components/Title';

export default function Index() {
  return (
    <Container>
      <Title>Dashboard</Title>
      <Paper>
        <Box p={2}>
          <Typography>Are we keeping this page?</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
