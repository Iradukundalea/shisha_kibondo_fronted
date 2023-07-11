import React, { useState } from 'react';
import Calendar from 'react-calendar'
import { Button } from '@mui/material';
import { setBeneficialAppointment } from '../../redux/actions/AppointmentActions'
import { useDispatch } from 'react-redux';

function RendezVous({ beneficialId, setshowCalendar }) {
    const [calDate, setCalDate] = useState(new Date())
    const today = new Date();

    const dispatch = useDispatch()

    function onChange(calDate){
        setCalDate(calDate)
    }

    function handleSettingAppointment(date){
      const settedDate = date.toLocaleDateString()
      dispatch(setBeneficialAppointment(beneficialId, settedDate, setshowCalendar))
    }

  return (
      <React.Fragment>
        <Calendar
            onChange={onChange}
            value={calDate}
            minDate={today}
        />
        <Button 
          variant='contained'
          sx={{ marginTop: 1}}
          onClick={() => handleSettingAppointment(calDate)}
        >
        Set, {calDate.toDateString()}
        </Button>
      </React.Fragment>
  );
}

export default RendezVous;
