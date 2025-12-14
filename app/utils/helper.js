export function formatDate(dateInput) {
  return new Date(dateInput).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}