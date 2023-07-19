import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate  } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/ResetPasswordActions'

const defaultTheme = createTheme();

function ResetForm() {
  const [password, setPassword] = React.useState(null)
  const [confirmPassword, setConfirmPassword] = React.useState(null)
  const [showErrors, setShowErrors] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState(true);

  // Regular expression to check password requirements
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if the password meets the requirements
  const isValidPassword = passwordPattern.test(password);
  const passwordError = !isValidPassword && showErrors;

  // Access token from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePasswordResetting = (e)=>{
    e.preventDefault()
    setShowErrors(true); // Show errors on form submission
    if(isValidPassword && passwordMatch){
      const data ={
        token,
        password,
        confirmPassword
      }
      console.log('Now submitting', {
        password,
        confirmPassword
      })

      dispatch(resetPassword(data, navigate))
    }
  }

  React.useEffect(() => {
    // Show errors on focus-out
    setShowErrors(false);
  }, [password, confirmPassword]);

  React.useEffect(() => {
    // Check password match on focus-out or form submission
    if (confirmPassword !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword, password]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Your Password
          </Typography>
          <Box component="form" onSubmit={handlePasswordResetting} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="new-password"
              label="New Password"
              type="password"
              id="new-password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              error={passwordError}
              helperText={
                passwordError
                  ? 'Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character.'
                  : ''
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              error={!passwordMatch && showErrors}
              helperText={!passwordMatch && showErrors ? 'Passwords do not match.' : ''}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // disabled
            >
              Save
            </Button>

          <Grid container>
              {/*  */}
              <Grid item>
                Already have an account?
                <Link href="/login" variant="body2">
                  {" Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default ResetForm;
