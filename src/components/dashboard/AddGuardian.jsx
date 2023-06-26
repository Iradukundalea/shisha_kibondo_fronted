import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { addGuardianAction } from '../../redux/actions/UserActions';

function AddGuardianForm({beneficialId, detailsLoading, setShowAddGuardianForm}) {
    const [idNumber, setIDNUMBER] = React.useState('')
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [sex, setSex] = React.useState('')

    const dispatch = useDispatch()
    const guardianFormRef = React.useRef(null);

    const handleFocus = () => {
        setIsInvalid(idNumber.length < 16);
    };

    const handleChangeIDNUMBER = (event) => {
        const value = event.target.value;
        setIDNUMBER(value);
        setIsInvalid(value.length < 16);
    };

    const handleSexChange = (event) =>{
        const newValue = event.target.value;
        setSex(newValue);
    }
    
    const clearForm= ()=>{
        guardianFormRef.current.reset();
        setSex('');
        setShowAddGuardianForm(false);
    }

    const handleSaveGuardian = (event)=>{
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        
        const guardianIdentityNumber = data.get('guardian-idnumber')
        const guardianFirstName = data.get('guardian-firstName')
        const guardianLastName = data.get('guardian-lastName')
        const guardianTelephone = data.get('guardian-telephone')
        const guardianSex = sex
        const province = data.get('province')
        const district = data.get('district')
        const sector = data.get('sector')
        const cell = data.get('cell')
        const village = data.get('village')

        const dt = {
            guardianFirstName,
            guardianLastName,
            guardianTelephone,
            guardianIdentityNumber,
            guardianSex,
            province,
            district,
            sector,
            cell,
            village,
        }
        dispatch(addGuardianAction(beneficialId, dt, clearForm))
    }

  return (
    <div>
        <Box component="form" onSubmit={handleSaveGuardian}  noValidate sx={{ mt: 1, mx: 4}} ref={guardianFormRef}>
            <Grid 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TextField 
                    id="standard-basic" 
                    label="ID Number" 
                    variant="standard"
                    name="guardian-idnumber"
                    inputProps={{
                        maxLength: 16,
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                    }}
                    onChange={handleChangeIDNUMBER}
                    onFocus={handleFocus}
                    error={isInvalid}
                    helperText={isInvalid ? 'ID number must be at least 16 characters long' : ''}
                />
                <TextField 
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                    name="guardian-firstName"
                    
                />
                <TextField 
                    id="standard-basic" 
                    label="Last Name" 
                    variant="standard" 
                    name="guardian-lastName"
                    
                />
                <TextField 
                    id="standard-basic" 
                    label="Telephone" 
                    variant="standard" 
                    name="guardian-telephone"
                />

            <FormControl>
                <FormLabel id="guardian-sex-buttons-group">Sex</FormLabel>
                <RadioGroup
                    aria-labelledby="guardian-sex-buttons-group"
                    name="guardian-sex"
                    value={sex}
                    onChange={handleSexChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <TextField
                id="standard-basic" 
                label="Province"
                variant="standard" 
                name="province"
            />
            <TextField
                id="standard-basic" 
                label="District" 
                variant="standard" 
                name="district"
            />
            <TextField 
                id="standard-basic" 
                label="Sector" 
                variant="standard" 
                name="sector"
            />
            <TextField 
                id="standard-basic" 
                label="Cell" 
                variant="standard" 
                name="cell"
            />
            <TextField 
                id="standard-basic"
                label="Village" 
                variant="standard" 
                name="village"
            />
            {detailsLoading ? (
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
                >
                ADDING...
            </Button>
            ):
            <Button
                type="submit"
                variant="contained"
                // disabled
                sx={{ mt: 3, mb: 2 }}
                >
                ADD
            </Button>
            }
            </Grid>
        </Box>
    </div>
  );
}

export default AddGuardianForm;
