import React from 'react';
import './styles/message.scss';

const Message = ({mensaje, colorMensaje}) => {
  return (
    <>
    <div className={colorMensaje ? 'alert alert-success col-md-6' : 'mensaje alert col-md-6 alert-danger'}>
        <h3>{mensaje}</h3>
    </div>
    </>
  )
}

export default Message;