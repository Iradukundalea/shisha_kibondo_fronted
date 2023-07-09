import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Paper, Typography } from '@mui/material';

function RendezVous() {
    const [calDate, setCalDate] = useState(new Date())

    function onChange(calDate){
        setCalDate(calDate)
    }

  return (
      <React.Fragment>
        
        {/* <Paper> */}
          <Calendar
              onChange={onChange}
              value={calDate}
          />
        {/* </Paper> */}
        <Typography>
          {calDate.toDateString()}
        </Typography>
      </React.Fragment>
  );
}

export default RendezVous;
