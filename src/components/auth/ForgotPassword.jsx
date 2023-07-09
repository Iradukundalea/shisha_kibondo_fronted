import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from '../../redux/actions/ResetPasswordActions'

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { resetLoading, error: passwordResetError } = useSelector(
    ({
      passwordReset: { loading :resetLoading, error },
    }) => ({
      resetLoading,
      error
    })
  );

  const handlePasswordReset = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get('email')

    console.log('Credentials', {
      email
    })

    dispatch(requestPasswordReset(email))

  };

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
          <Box component="form" onSubmit={handlePasswordReset} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {resetLoading ? (
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              // disabled
            >
              Sending...
            </Button>
            ) : (
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              // disabled
            >
              Send
            </Button>
            )}
          
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
