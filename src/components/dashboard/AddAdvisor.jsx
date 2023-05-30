import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAdvisor } from '../../redux/actions/AdvisorActions';
import { useRef, useState } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

export default function AddAdvisor() {
    const formRef = useRef(null);

    const dispatch = useDispatch()
    const { error }= useSelector((state)=> state.advisorState)

    const clearForm= ()=>{
        formRef.current.reset();
    }

    const handleSaveAdvisor = async (event) => {
        preventDefault(event)

        const data = new FormData(event.currentTarget);
        
        const email = data.get('email')
        const  firstName = data.get('firstName')
        const  lastName = data.get('lastName')
        const  telephone = data.get('telephone')
        const  degree = data.get('degree')
        const  specialized = data.get('specialized')
        const sex = data.get('radio-buttons-group')

        const saveData = {
          email,
          firstName,
          lastName,
          telephone,
          degree,
          specialized,
          sex,
          password: 'Shisha@12345'
        }

        dispatch(addNewAdvisor(saveData, clearForm));

    };

  return (
    <React.Fragment>
      <Title>Add new advisor</Title>
      <p>{error}</p>
      <Box component="form" onSubmit={handleSaveAdvisor} noValidate sx={{ mt: 0 }} ref={formRef}>
            <TextField 
                id="standard-basic"
                label="First Name"
                variant="standard"
                name="firstName"
            />
            <TextField 
                id="standard-basic" 
                label="Last Name" 
                variant="standard" 
                name="lastName"
            />
            <TextField 
                id="standard-basic" 
                label="Email" 
                variant="standard" 
                name="email"
            />
            <TextField 
                id="standard-basic" 
                label="Telephone" 
                variant="standard" 
                name="telephone"
            />
            <TextField 
                id="standard-basic" 
                label="Degree" 
                variant="standard" 
                name="degree"
            />
            <TextField 
                id="standard-basic" 
                label="Specialization" 
                variant="standard" 
                name="specialized"
            />
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 0 }}
            >
              Save
            </Button>
          </Box>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}