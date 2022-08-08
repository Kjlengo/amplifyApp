import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuthContext from '../hooks/useAuthContext';

export default function DenseAppBar() {
  const {logout} = useAuthContext();
  const toolbarStyle = {backgroundColor: '#002855'}

  function handleLogout(){
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={toolbarStyle}>
          <Typography variant="h4" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Konecta
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
