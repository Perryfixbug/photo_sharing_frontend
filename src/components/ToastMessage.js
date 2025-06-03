import React from 'react';
import { Snackbar } from '@mui/material';

const ToastMessage = ({ open, onClose, message, duration = 2000 }) => {
    console.log("ToastMessage rendered with message:", message);
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
  );
};

export default ToastMessage;
