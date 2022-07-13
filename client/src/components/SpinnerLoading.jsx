import React from 'react';
import {Spinner} from 'reactstrap'

const SpinnerLoading = () => {
  return (
    <div className='d-flex mx-auto align-items-center h-100'>
        <Spinner className='mx-auto' color="primary"/>
    </div>
  )
}

export default SpinnerLoading