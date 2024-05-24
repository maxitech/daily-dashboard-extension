const app = document.querySelector<HTMLDivElement>('#app');

function generateButton() {
  const button = document.createElement('button');
  button.textContent = 'Set as Default Location';
  button.id = 'default-location-button';

  //   if (app && !app.contains(button)) {
  //     app.appendChild(button);
  //   }

  return button;
}

export { generateButton };
