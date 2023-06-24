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
import { addNewNurse } from '../../redux/actions/NursesActions';
import { useRef, useState } from 'react';
import Select from '../Select'
import { Provinces, Districts, Sectors, Cells, Villages } from 'rwanda'

function preventDefault(event) {
  event.preventDefault();
}

export default function AddAdvisor() {
    const nurseformRef = useRef(null);
    const [province, setProvince] = React.useState('')
    const [district, setDistrict] = React.useState('')
    const [sector, setSector] = React.useState('')
    const [cell, setCell] = React.useState('')
    const [village, setVillage] = React.useState('')

    const dispatch = useDispatch()
    const { error }= useSelector((state)=> state.nurseState)
    const clearForm= ()=>{
        nurseformRef.current.reset();
        setProvince('')
        setDistrict('')
        setSector('')
        setCell('')
        setVillage('')
    }

    const handleSaveNurse = async (event) => {
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
          password: 'Shishanurse@12345',
          province,
          district,
          sector,
          cell,
          village
        }

        dispatch(addNewNurse(saveData, clearForm));

    };
    const handleProvinceChange =(value) =>{
      setDistrict('')
      setProvince(value)
    }

    const handleDistrictChange =(value) =>{
      setSector('')
      setDistrict(value)
    }

    const provinces = Provinces()
    const provinceOptions = provinces.map((province, index) => ({
      key: `province_${index}`,
      label: province,
      value: province.toLowerCase().replace(/\s/g, '_'),
    }));

    const districts = Districts(province);
    const districtOptions = districts.map((district, index) => ({
          key: `district_${index}`,
          label: district,
          value: district.toLowerCase().replace(/\s/g, '_'),
    }));

    const sectors = Sectors(province, district);
    const sectorOptions = sectors?.map((sector, index) => ({
      key: `sector_${index}`,
      label: sector,
      value: sector.toLowerCase().replace(/\s/g, '_')
    }))

    const cells = Cells(province, district, sector)
    const cellOptions = cells?.map((cell, index) => ({
      key: `cell_${index}`,
      label: cell,
      value: cell.toLowerCase().replace(/\s/g, '_')
    }))

    const villages = Villages(province, district, sector, cell)
    const villageOptions = villages?.map((village, index) => ({
      key: `village_${index}`,
      label: village,
      value: village.toLowerCase().replace(/\s/g, '_')
    }))

    const isAnyFieldEmpty = () => {
      return !(province && district && sector && cell && village);
    };
    console.log('DDDDSSSSSOOOOOOOPPPTIO', districtOptions)

  return (
    <React.Fragment>
      <Title>Add new nurse</Title>
      <p>{error}</p>
      <Box component="form" onSubmit={handleSaveNurse} noValidate sx={{ mt: 0 }} ref={nurseformRef}>
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

            <Select 
              id="province" 
              label="Province" 
              options={provinceOptions} 
              value={province}
              onChange={handleProvinceChange}
           />

             <Select 
              id="district" 
              label="District" 
              options={districtOptions} 
              value={district}
              onChange={handleDistrictChange}
            />

            <Select 
              id="sector" 
              label="Sector" 
              options={sectorOptions} 
              value={sector}
              onChange={(value)=> setSector(value)}
            />

            <Select 
              id="cell" 
              label="Cell" 
              options={cellOptions} 
              value={cell}
              onChange={(value)=> setCell(value)}
            />

            <Select 
              id="village" 
              label="Village" 
              options={villageOptions} 
              value={village}
              onChange={(value)=> setVillage(value)} 
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isAnyFieldEmpty()}
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