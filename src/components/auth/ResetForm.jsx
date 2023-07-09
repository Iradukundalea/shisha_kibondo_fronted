import React from 'react';
import { useParams } from 'react-router-dom';

function ResetForm() {
    const token = useParams().token
    const decodedToken = decodeURIComponent(token);
    console.log('UUUUUSSSSSERRRRRRRRRR TTTOKEN', decodedToken)
  return (
    <div>
      Got Reset Form
    </div>
  );
}

export default ResetForm;
