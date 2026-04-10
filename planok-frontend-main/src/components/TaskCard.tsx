import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; // Icono para urgencia
import type { Task } from '../types/task.types';
import { CategoryChip } from './CategoryChip';
import { StatusChip } from './StatusChip';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const getCategoryColor = (category?: string) => {
  switch (category?.toLowerCase()) {
    case 'trabajo': return '#1976d2';
    case 'finanzas': return '#2e7d32';
    case 'salud': return '#d32f2f';
    case 'estudio': return '#ed6c02';
    default: return '#bdbdbd';
  }
};

export function TaskCard({ task, onEdit, onDelete, onUpdateStatus }: TaskCardProps) {
  const hasSubtasks = task.subTasks && task.subTasks.length > 0;
  const hasAISuggestions = task.ai_suggestions && task.ai_suggestions.length > 0;
  
  // Detectamos si la prioridad viene como 'urgent' desde el backend
  const isUrgent = task.priority === 'urgent';
  const borderColor = isUrgent ? '#ff1744' : getCategoryColor(task.category);

  return (
    <Card
      sx={{
        height: 380, // Aumentamos ligeramente para acomodar la alerta
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `6px solid ${borderColor}`,
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': { boxShadow: 8, transform: 'translateY(-4px)' },
        position: 'relative',
        bgcolor: isUrgent ? 'rgba(255, 23, 68, 0.02)' : 'inherit',
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', pb: 1 }}>
        
        {/* ALERTA DE URGENCIA VISUAL */}
        {isUrgent && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#ff1744', fontWeight: 900, fontSize: '0.75rem', letterSpacing: 1, display: 'flex', alignItems: 'center' }}>
              <PriorityHighIcon sx={{ fontSize: '1rem' }} /> {task.priority_display || 'URGENTE'}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.05rem', 
              fontWeight: 700, 
              flex: 1, 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              color: isUrgent ? '#b71c1c' : 'inherit'
            }}
          >
            {task.title}
          </Typography>
          <StatusChip status={task.status} />
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <CategoryChip category={task.category} />
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'pre-line', fontSize: '0.85rem' }}>
            {task.description || "Sin descripción adicional."}
          </Typography>

          {/* SECCIÓN DE IA: HOJA DE RUTA */}
          {hasAISuggestions && (
            <Box sx={{ mt: 1, mb: 2, p: 1.5, bgcolor: 'rgba(25, 118, 210, 0.05)', borderRadius: 2, borderLeft: '3px solid #1976d2' }}>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                <AutoAwesomeIcon sx={{ fontSize: '0.8rem' }} /> Hoja de ruta sugerida
              </Typography>
              {task.ai_suggestions?.map((step, index) => (
                <Typography key={index} variant="caption" display="block" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.5 }}>
                  • {step}
                </Typography>
              ))}
            </Box>
          )}

          {/* SUBTAREAS MANUALES */}
          {hasSubtasks && (
            <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
              <List dense disablePadding>
                {task.subTasks?.slice(0, 3).map((st) => (
                  <ListItem key={st.id} disableGutters sx={{ py: 0.1 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      {st.completed ? <CheckCircleIcon sx={{ fontSize: '0.9rem' }} color="success" /> : <RadioButtonUncheckedIcon sx={{ fontSize: '0.9rem' }} color="disabled" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="caption" sx={{ textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? 'text.disabled' : 'text.primary', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {st.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </CardContent>

      <Divider sx={{ opacity: 0.6 }} />

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        {task.status !== 'completed' ? (
          <Button 
            size="small" 
            variant="text" 
            color={isUrgent ? "error" : "success"} 
            startIcon={<CheckCircleIcon />}
            onClick={() => onUpdateStatus && onUpdateStatus(task.id, 'completed')}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Terminar
          </Button>
        ) : (
          <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 'bold', ml: 1 }}>
            ✅ ¡Logrado!
          </Typography>
        )}

        <Box>
          <Tooltip title="Editar">
            <IconButton size="small" color="primary" onClick={() => onEdit(task.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" color="error" onClick={() => onDelete(task.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}