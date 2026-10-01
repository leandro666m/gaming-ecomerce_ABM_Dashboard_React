export function authorizationErrorMessage(error, action) {
  if (error.status === 401) return 'La sesión expiró. Iniciá sesión nuevamente.';
  if (error.status === 403) return `No tenés permisos para ${action}.`;
  return '';
}
