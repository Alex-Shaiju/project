import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <AssignmentIcon sx={{ mr: 2 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Alex Shaiju Task Manager
        </Typography>
        <Typography variant='body2'>
          MERN Stack Project
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
