import { Chip } from '@mui/material';

/**
 * Mapa de estados compatible con Django y React.
 * Usamos strings directos para evitar errores de importación.
 */
const STATUS_MAP: Record<string, { label: string; color: "warning" | "info" | "success" | "default" }> = {
  // Valores que vienen de Django
  pending: { label: 'Pendiente', color: 'warning' },
  in_progress: { label: 'En progreso', color: 'info' },
  completed: { label: 'Completada', color: 'success' },
  
  // Valores que vienen de React
  pendiente: { label: 'Pendiente', color: 'warning' },
  en_progreso: { label: 'En progreso', color: 'info' },
  completada: { label: 'Completada', color: 'success' },
};

interface StatusChipProps {
  status: string;
}

export function StatusChip({ status }: StatusChipProps) {
  // Si el status es nulo o no existe en el mapa, usamos 'pending' por defecto
  const config = STATUS_MAP[status] || STATUS_MAP.pending;

  return (
    <Chip 
      label={config.label} 
      color={config.color} 
      size="small" 
      variant="outlined" 
    />
  );
}
