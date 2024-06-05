export default function generateButton(textContent: string, id: string) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.id = id;

  return button;
}
