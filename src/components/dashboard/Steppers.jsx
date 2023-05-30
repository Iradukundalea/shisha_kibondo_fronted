// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button, Typography, 
//     TextField, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox 
// } from '@mui/material';

// const steps = ['Check Category', 'Add new People', 'Results'];

// const StepperExample = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [category, setCategory] = useState('');
//   const [people, setPeople] = useState([]);
//   const [selectedPeople, setSelectedPeople] = useState([]);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handlePersonChange = (event, person) => {
//     if (event.target.checked) {
//       setSelectedPeople((prevSelectedPeople) => [...prevSelectedPeople, person]);
//     } else {
//       setSelectedPeople((prevSelectedPeople) => prevSelectedPeople.filter((p) => p !== person));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here, e.g., saving the people to a database
//     // You can access the selectedPeople array to perform further actions
//   };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div>
//             <Typography variant="h5">Check Category</Typography>
//             <TextField
//               label="Category"
//               value={category}
//               onChange={handleCategoryChange}
//               fullWidth
//               margin="normal"
//             />
//             <Button variant="contained" color="primary" onClick={handleNext}>
//               Next
//             </Button>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             <Typography variant="h5">Add new People</Typography>
//             <form onSubmit={handleSubmit}>
//               <FormControl component="fieldset">
//                 <FormLabel component="legend">Select People</FormLabel>
//                 <FormGroup>
//                   {people.map((person) => (
//                     <FormControlLabel
//                       key={person}
//                       control={
//                         <Checkbox
//                           checked={selectedPeople.includes(person)}
//                           onChange={(event) => handlePersonChange(event, person)}
//                           value={person}
//                         />
//                       }
//                       label={person}
//                     />
//                   ))}
//                 </FormGroup>
//               </FormControl>
//               <Button onClick={handleBack}>Back</Button>
//               <Button type="submit" variant="contained" color="primary" onClick={handleNext}>
//                 Next
//               </Button>
//             </form>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <Typography variant="h5">Results</Typography>
//             <Typography variant="body1">Selected People:</Typography>
//             <ul>
//               {selectedPeople.map((person) => (
//                 <li key={person}>{person}</li>
//               ))}
//             </ul>
//             <Button onClick={handleBack}>Back</Button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       {getStepContent(activeStep)}
//     </div>
//   );
// };

// export default StepperExample;



import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiInput from '@mui/material/Input';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { checkUbudeheCategoryAction } from '../../redux/actions/CheckUbudeheCategoryAction';
import { addNewBeneficial } from '../../redux/actions/BeneficialsActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {getCurrentUser} from '../../utils/getCurrentUser'

export default function Steppers ({ setShowAddForm}){
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNextStep = ()=>{
        setActiveStep((currentStep)=> currentStep + 1 )
    }

    const handlePrevStep = ()=>{
        setActiveStep((currentStep)=> currentStep - 1 )
    }

    const [status, setStatus] = React.useState('');
    const [idNumber, setIDNUMBER] = React.useState('')
    const [isInvalid, setIsInvalid] = React.useState(false);
    
    const [nurseId, setNurseId] = React.useState('')

    const { 
        loading: isChecking, 
        message: checkMessage,  
        results 
        } = useSelector((state)=> state.ubudeheState)

    const {
        loading: isSavingBeneficial,
        error: addBeneficialMessage
        } = useSelector((state) => state.beneficialState)
        
    const [sex, setSex] = React.useState(results?.spouse?.sex)

    useEffect(()=>{
        const user = getCurrentUser();
        console.log('OUTUUUUUUUT', user)
        setNurseId(user.id)
    }, [])

    const handleChangeBeneficialStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleFocus = () => {
        setIsInvalid(idNumber.length < 16);
    };

    const handleChangeIDNUMBER = (event) => {
        const value = event.target.value;
        setIDNUMBER(value);
        setIsInvalid(value.length < 16);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hideForm = ()=>{
        setShowAddForm(false)
    }

    const handleCheckUbudehe = (event)=>{
        event.preventDefault();

        dispatch(checkUbudeheCategoryAction(idNumber))
    }

    const handleSaveBeneficial = (event)=>{
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        
        const beneficialIdentityNumber = data.get('beneficial-identitynumber')
        const beneficialFirstName = data.get('beneficial-firstName')
        const beneficialLastName = data.get('beneficial-lastName')
        const beneficialTelephone = data.get('beneficial-telephone')
        // const beneficialSex = data.get('beneficial-sex')
        const beneficialSex = sex

        const healthCenter = data.get('health-center')
        const province = data.get('province')
        const district = data.get('district')
        const sector = data.get('sector')
        const cell = data.get('cell')
        const village = data.get('village')
        const status = data.get('beneficial-status')

        const dt = {
            beneficialIdentityNumber,
            beneficialFirstName,
            beneficialLastName,
            beneficialTelephone,
            beneficialSex,
            healthCenter,
            province,
            district,
            sector,
            cell,
            village,
            status,
            nurseId
        }

        dispatch(addNewBeneficial(dt, hideForm))
    }
    
    const handleSexChange = (event) =>{
        const newValue = event.target.value;
        setSex(newValue);
    }

    const stepContent = (step)=>{
        switch(step){
            case 0:
                return (
                    <div>
                        <Box  noValidate sx={{ mt: 1, mx: 4}}>
                            <Grid 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <TextField 
                                    id="standard-basic" 
                                    label="ID NUMBER" 
                                    variant="standard"
                                    name="idnumber"
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
                                {isChecking? (
                                    <Button
                                    type="submit"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    disabled
                                    >
                                    CHECKING...
                                </Button>
                                ): (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!idNumber.length || isInvalid}
                                    onClick={handleCheckUbudehe}
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    CHECK NOW
                                </Button>
                                )}

                                {Object.keys(results).length ? (
                                    <>
                                    <Typography>Name: {results?.firstName}  {results.lastName}</Typography>
                                    <Typography>Ubudehe: {results?.ubudeheCategory}</Typography>
                                    <Typography>Spouse: {results?.spouse?.IDNumber} - {results?.spouse?.firstName} {results?.spouse?.lastName}</Typography>
                                    {/* <pre>
                                        {JSON.stringify(results, null, 2)}
                                    </pre> */}
                                    </>
                                ) : ''}

                                {checkMessage ? (
                                    <Typography>{checkMessage}</Typography>
                                ) : '' }
                               
                            </Grid>

                            {/* Show it when result found */}
                            <Box display="flex" justifyContent="flex-end" mb={2}>
                            {Object.keys(results).length && results.ubudeheCategory === 1 ? (
                                <Button 
                                    variant='outlined' 
                                    color='primary'
                                    onClick={handleNextStep}
                                >   
                                    Next Step
                                </Button>
                            ) : 
                                Object.keys(results).length && results.ubudeheCategory !== 1 ? (
                                  <Typography>Not eligible to get shishakibondo service!</Typography>  
                                ) :
                            ''
                            }
                            </Box>
                        </Box>
                    </div>
                )
            
            case 1:
                return (
                    <div>
                        <Box component="form" onSubmit={handleSaveBeneficial}  noValidate sx={{ mt: 1, mx: 4}}>
                            <Grid 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <TextField 
                                    id="standard-basic"
                                    label="Identity Number"
                                    variant="standard"
                                    name="beneficial-identitynumber"
                                    value={results?.spouse?.IDNumber}

                                />

                                <TextField 
                                    id="standard-basic"
                                    label="First Name"
                                    variant="standard"
                                    name="beneficial-firstName"
                                    value={results?.spouse?.firstName}
                                />
                                
                                <TextField 
                                    id="standard-basic" 
                                    label="Last Name" 
                                    variant="standard" 
                                    name="beneficial-lastName"
                                    value={results?.spouse?.lastName}
                                />
                                <TextField 
                                    id="standard-basic" 
                                    label="Telephone" 
                                    variant="standard" 
                                    name="beneficial-telephone"
                                />

                            <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Sex</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={sex}
                                onChange={handleSexChange}
                                >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            </FormControl>

                                {/* <FormControl>
                                    <FormLabel id="sex-radio-buttons-group-label">Sex</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="sex-radio-buttons-group-label"
                                        defaultValue={results?.spouse?.sex}
                                        value={results?.spouse?.sex}
                                        onChange={handleSexChange}
                                        name="beneficial-sex"
                                    >
                                        <FormControlLabel 
                                            value="female" 
                                            // disabled={results?.spouse?.sex !== 'female'}
                                            control={<Radio />} 
                                            label="Female" 
                                        />
                                        <FormControlLabel 
                                            value="male" 
                                            // disabled={results?.spouse?.sex !== 'male'}
                                            control={<Radio />} 
                                            label="Male" 
                                        />
                                        <FormControlLabel 
                                            value="other" 
                                            // disabled={results?.spouse?.sex !== 'other'}
                                            control={<Radio />} 
                                            label="Other" 
                                        />
                                    </RadioGroup>
                                </FormControl> */}
                                
                                {/* <RadioGroup
                                    name="beneficial-sex"
                                    // value={value}
                                    // onChange={handleRadioChange}
                                    row
                                    >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup> */}

                                <TextField 
                                    id="standard-basic" 
                                    label="HealthCenter" 
                                    variant="standard" 
                                    name="health-center"
                                />
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
                                <FormControl
                                    sx={{
                                        mt: 2
                                    }}
                                >
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={handleChangeBeneficialStatus}
                                    name="beneficial-status"
                                >
                                    <MenuItem value='pregnant'>Pregnant</MenuItem>
                                    <MenuItem value='children'>Has a Child</MenuItem>
                                </Select>
                                </FormControl>

                                {isSavingBeneficial? (
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    
                                    >
                                    ADDING...
                                </Button>
                                ): (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    // disabled
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    ADD
                                </Button>
                                )}

                                {addBeneficialMessage ? (
                                    <Typography>{addBeneficialMessage}</Typography>
                                ): ''}
                            </Grid>

                            <Box display="flex" justifyContent="flex-end" m={2}>
                                <Button 
                                    variant='outlined' 
                                    color='primary'
                                    onClick={handlePrevStep}
                                >
                                    Previous Step
                                </Button>
                                {/* <Button 
                                    variant='outlined' 
                                    color='primary'
                                    onClick={handleNextStep}
                                >   
                                    Next Step
                                </Button> */}
                            </Box>
                        </Box>
                    </div>
                )

            // case 2:
            //     return (
            //         <div>
            //             step 3 at 2 index
            //             <Button 
            //                 variant='outlined' 
            //                 color='primary'
            //                 onClick={handlePrevStep}
            //             >
            //                 Previous Step
            //             </Button>
            //         </div>
            //     )
            default: 
            return null 

        }
    }
    return (
        <div>
           <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel>Check Ubudehe Category</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Add Beneficial</StepLabel>
                </Step>
                {/* <Step>
                    <StepLabel>Add Beneficial's Guardian</StepLabel>
                </Step> */}
           </Stepper>
           {stepContent(activeStep)}
           
        </div>
    )
}