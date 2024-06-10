export default function generateSpinner() {
  const spinnerElement = document.createElement('div');
  spinnerElement.id = 'spinner';
  spinnerElement.classList.add('flex', 'items-center', 'justify-center');
  const spanElement = document.createElement('span');
  spanElement.classList.add('loading', 'loading-spinner', 'loading-lg');
  spinnerElement.appendChild(spanElement);
  return spinnerElement;
}
