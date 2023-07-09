import React, { useState } from 'react';
import Calendar from 'react-calendar'

function RendezVous() {
    const [calDate, setCalDate] = useState(new Date())

    function onChange(calDate){
        setCalDate(calDate)
    }

  return (
    <div>
      <Calendar
        //   onChange={this.onChange}
          value={calDate}
        />
    </div>
  );
}

export default RendezVous;
