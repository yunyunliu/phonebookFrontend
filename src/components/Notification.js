import React from 'react';

const Notification = ({message}) => {
  const m = message.toLowerCase();
  let styling;
  if (m.includes('error')) {
    styling = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
  } else {
    styling =  styling = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
  }

  if (message === '') {
    return null;
  } else {
    return (
      <div style={styling}>
        {message}
      </div>
      );
  }
};
 
export default Notification;