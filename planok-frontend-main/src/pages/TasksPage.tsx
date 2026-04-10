import { useState, useCallback, useMemo } from 'react'; 
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  MenuItem,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTasks } from '../hooks/useTasks';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { useUIStore } from '../store/ui.store';
import type { CreateTaskDto, UpdateTaskDto } from '../types/task.types';
import { TaskList } from '../components/TaskList';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { env } from '../config/env';

export function TasksPage() {
  const { 
    tasks, 
    isEmpty, 
    isLoading, 
    isError, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    isCreating, 
    isUpdating, 
    isDeleting 
  } = useTasks();

  const { filteredTasks } = useTaskFilters(tasks);
  const { isFormOpen, editingTaskId, openForm, closeForm } = useUIStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const finalTasks = useMemo(() => {
    return filteredTasks.filter(task => 
      selectedCategory === 'all' || task.category === selectedCategory
    );
  }, [filteredTasks, selectedCategory]);

  const editingTask = editingTaskId ? tasks.find((t) => t.id === editingTaskId) ?? null : null;

  const showMessage = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // --- ESTA ES LA FUNCIÓN QUE TE FALTABA DEFINIR ---
  const handleUpdateStatus = useCallback(async (id: string, status: string) => {
    try {
      await updateTask({ id, data: { status } });
      showMessage('✅ Tarea actualizada correctamente');
    } catch (err) {
      showMessage('❌ Error al actualizar el estado', 'error');
    }
  }, [updateTask]);

  const handleFormSubmit = useCallback(
    async (data: CreateTaskDto | { id: string; data: UpdateTaskDto }) => {
      try {
        if ('id' in data) {
          await updateTask(data);
          showMessage('✅ Tarea actualizada correctamente');
        } else {
          await createTask(data);
          showMessage('🚀 Tarea creada y procesada por IA');
        }
        closeForm(); 
      } catch (err: any) {
        showMessage('❌ Error al guardar la tarea', 'error');
      }
    },
    [createTask, updateTask, closeForm],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteTask(deleteTarget.id);
      showMessage('Tarea eliminada correctamente');
      setDeleteTarget(null);
    } catch {
      showMessage('Error al eliminar la tarea', 'error');
    }
  }, [deleteTarget, deleteTask]);

  const handleEditClick = useCallback((id: string) => openForm(id), [openForm]);

  const handleDeleteClick = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (task) setDeleteTarget({ id: task.id, title: task.title });
    },
    [tasks],
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          {env.appTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tus tareas con asistencia de inteligencia artificial
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error al cargar las tareas: {error?.message || "Servidor no disponible"}
        </Alert>
      )}

      {!isEmpty && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, width: '100%' }}>
            <SearchBar />
            <TextField
              select
              size="small"
              label="Filtrar Categoría"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="trabajo">Trabajo</MenuItem>
              <MenuItem value="finanzas">Finanzas</MenuItem>
              <MenuItem value="salud">Salud</MenuItem>
              <MenuItem value="estudio">Estudio</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>
          </Box>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openForm()} sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Nueva tarea
          </Button>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : isEmpty ? (
        <EmptyState onCreateTask={() => openForm()} />
      ) : (
        <TaskList
          tasks={finalTasks}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onUpdateStatus={handleUpdateStatus} // <--- Ya está definido arriba, ahora sí funcionará
        />
      )}

      <TaskFormDialog open={isFormOpen} task={editingTask} onClose={closeForm} onSubmit={handleFormSubmit} isSubmitting={isCreating || isUpdating} />
      <DeleteConfirmDialog open={deleteTarget !== null} taskTitle={deleteTarget?.title ?? ''} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} isDeleting={isDeleting} />
      
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}