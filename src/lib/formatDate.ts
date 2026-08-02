export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('lt-LT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
