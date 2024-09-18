export default function getLocalTime(dt: number, timezone: number) {
  const localDate = new Date((dt + timezone) * 1000);

  const hours = localDate.getUTCHours().toString().padStart(2, '0');
  const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
