import React from 'react';
import { Skeleton, Box, Typography, Stack, Paper } from '@mui/material';
import type { Task } from '../types/task.types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  // --- AGREGAMOS ESTA PROP PARA CONECTAR EL BOTÓN ---
  onUpdateStatus: (id: string, status: string) => void;
}

export function TaskList({ tasks, isLoading, onEdit, onDelete, onUpdateStatus }: TaskListProps) {
  if (isLoading) return <LoadingSkeleton />;

  // Filtramos las tareas por su estado actual
  const pendingTasks = tasks.filter(t => (t.status as string) === 'pending');
  const completedTasks = tasks.filter(t => (t.status as string) === 'completed');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 2 }}>
      {/* COLUMNA: POR HACER */}
      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2, minHeight: '70vh', border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1976d2', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#1976d2', borderRadius: '50%', mr: 1.5 }} />
          Por Hacer ({pendingTasks.length})
        </Typography>
        <Stack spacing={2}>
          {pendingTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onUpdateStatus={onUpdateStatus} // <--- SE PASA AQUÍ
            />
          ))}
        </Stack>
      </Paper>

      {/* COLUMNA: COMPLETADAS */}
      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f1f8e9', borderRadius: 2, minHeight: '70vh', border: '1px solid #c8e6c9' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#2e7d32', borderRadius: '50%', mr: 1.5 }} />
          Completadas ({completedTasks.length})
        </Typography>
        <Stack spacing={2}>
          {completedTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onUpdateStatus={onUpdateStatus} // <--- SE PASA AQUÍ
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

function LoadingSkeleton() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      {[1, 2].map((col) => (
        <Skeleton key={col} variant="rectangular" height="70vh" sx={{ borderRadius: 2 }} />
      ))}
    </Box>
  );
}