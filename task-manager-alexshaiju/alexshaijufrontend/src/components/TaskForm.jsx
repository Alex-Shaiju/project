import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

export default function TaskForm({ initialTask = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || ''
      });
    }
  }, [initialTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim()) {
      onSubmit(form);
      if (!initialTask) {
        setForm({ title: '', description: '' });
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        {initialTask ? 'Edit Task' : 'Add New Task'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          label='Task Title'
          name='title'
          value={form.title}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label='Description (Optional)'
          name='description'
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type='submit' variant='contained' color='primary'>
            {initialTask ? 'Update Task' : 'Add Task'}
          </Button>
          {initialTask && (
            <Button onClick={onCancel} variant='outlined'>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
