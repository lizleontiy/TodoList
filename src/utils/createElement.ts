export function createElement(tag: string, className?: string, text?: string) {
  const element = document.createElement(tag)
  if (className) {
    element.classList.add(className)
  }
  if (text) {
    element.textContent = text
  }
  return element
}
