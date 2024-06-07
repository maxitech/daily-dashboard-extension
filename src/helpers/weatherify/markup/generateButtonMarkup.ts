export default function generateButton(textContent: string, id: string) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.id = id;
  button.classList.add('btn', 'btn-sm');

  return button;
}
