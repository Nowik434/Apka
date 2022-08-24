import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{marginTop: '50px'}}>
        {'Copyright © '}
        <Link color="inherit" href="https://vccsystem.eu/">
          Fundacja VCC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Copyright;