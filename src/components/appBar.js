import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {

const toolbarStyle = {backgroundColor: '#002855'}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={toolbarStyle}>
          <Typography variant="h4" color="inherit" component="div">
            Konecta
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
