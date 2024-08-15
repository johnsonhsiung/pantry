import React from 'react';
import { Button } from '@mui/material';

function SquareButton({ children, color, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: '20px',  // Set width
        height: '20px', // Set height to match width
        minWidth: '0',  // Prevent default minimum width
        padding: '0', // Remove default padding
        display: 'flex', // Center content within the button
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
      }}
      {...props} // Spread any additional props (like onClick)
    >
      {children} 
    </Button>
  );
}

export default SquareButton;
