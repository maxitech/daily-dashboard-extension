export default function generateButton() {
  const button = document.createElement('button');
  button.textContent = 'Set as Default Location';
  button.id = 'default-location-button';

  return button;
}
