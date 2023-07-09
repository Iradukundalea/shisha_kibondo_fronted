import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert ({message}){
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal } = state;
    return (
        <div>
            <Alert severity="error">{message}</Alert>
             {/* <Snackbar
                open={true}
                autoHideDuration={2000}
                anchorOrigin= {{ vertical, horizontal}}
                // onClose={handleClose}
                message="Note archived"
                // action={action}
            >
                <Alert severity="error">{message}</Alert>
            </Snackbar> */}
        </div>
    )
}
