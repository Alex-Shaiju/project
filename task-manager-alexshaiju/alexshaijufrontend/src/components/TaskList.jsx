import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Box,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color='text.secondary'>
          No tasks yet. Add your first task above!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Your Tasks ({tasks.length})
      </Typography>
      <List>
        {tasks.map((task, index) => (
          <React.Fragment key={task._id}>
            <ListItem
              sx={{
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                      color: task.status === 'Completed' ? 'text.secondary' : 'text.primary',
                      mr: 2
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Chip
                    label={task.status}
                    size='small'
                    color={task.status === 'Completed' ? 'success' : 'warning'}
                    icon={task.status === 'Completed' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                  />
                </Box>
                {task.description && (
                  <Typography variant='body2' color='text.secondary'>
                    {task.description}
                  </Typography>
                )}
                <Typography variant='caption' color='text.secondary'>
                  Created: {new Date(task.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  onClick={() => onToggleStatus(task)}
                  color={task.status === 'Completed' ? 'success' : 'default'}
                  title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                >
                  {task.status === 'Completed' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
                <IconButton onClick={() => onEdit(task)} color='primary'>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(task)} color='error'>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            {index < tasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
