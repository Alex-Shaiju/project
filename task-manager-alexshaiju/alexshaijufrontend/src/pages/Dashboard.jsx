import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import api from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      showSnackbar('Error fetching tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create new task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([response.data.data, ...tasks]);
      showSnackbar('Task created successfully', 'success');
    } catch (error) {
      showSnackbar('Error creating task', 'error');
    }
  };

  // Update task
  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(t => t._id === editingTask._id ? response.data.data : t));
      setEditingTask(null);
      showSnackbar('Task updated successfully', 'success');
    } catch (error) {
      showSnackbar('Error updating task', 'error');
    }
  };

  // Delete task
  const confirmDelete = async () => {
    try {
      await api.delete(`/tasks/${deleteTarget._id}`);
      setTasks(tasks.filter(t => t._id !== deleteTarget._id));
      showSnackbar('Task deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Error deleting task', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  // Toggle task status
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      const response = await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? response.data.data : t));
      showSnackbar(`Task marked as ${newStatus}`, 'success');
    } catch (error) {
      showSnackbar('Error updating task status', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TaskStats tasks={tasks} />
      
      <TaskForm
        initialTask={editingTask}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        onCancel={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title='Delete Task'
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}