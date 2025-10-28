import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

export default function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;

  const StatCard = ({ title, count, icon, color }) => (
    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
      <Box sx={{ color, mb: 1 }}>{icon}</Box>
      <Typography variant='h4' gutterBottom>{count}</Typography>
      <Typography variant='body2' color='text.secondary'>{title}</Typography>
    </Paper>
  );

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <StatCard
          title='Total Tasks'
          count={totalTasks}
          icon={<AssignmentIcon fontSize='large' />}
          color='primary.main'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          title='Completed'
          count={completedTasks}
          icon={<CheckCircleIcon fontSize='large' />}
          color='success.main'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          title='Pending'
          count={pendingTasks}
          icon={<PendingIcon fontSize='large' />}
          color='warning.main'
        />
      </Grid>
    </Grid>
  );
}