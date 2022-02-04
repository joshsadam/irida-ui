import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
