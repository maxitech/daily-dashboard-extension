export default function cloneButton(
  button: HTMLButtonElement
): HTMLButtonElement {
  const clonedButton = button.cloneNode(true) as HTMLButtonElement;
  button.parentNode?.replaceChild(clonedButton, button);
  return clonedButton;
}
