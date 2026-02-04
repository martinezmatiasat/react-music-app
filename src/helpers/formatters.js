const API_URL = import.meta.env.VITE_API_URL;

// Formatear la ruta de la imagen
const formatFilePath = (path) => {
  return `${API_URL}/uploads/${path}`;
};

// Formatear duración a minutos:segundos
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Formatear duración a texto legible
const formatDurationText = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} h ${mins} min`;
  }
  return `${mins} min`;
};

export {
  formatFilePath,
  formatDuration,
  formatDurationText,
};