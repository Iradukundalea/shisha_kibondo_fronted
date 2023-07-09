import * as React from 'react';
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
         <p>Landing Page</p>
         <button>
            <Link to='/login'>Login</Link>
         </button>
    </div>
  )
}