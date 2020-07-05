export default function randomColor() {
  const r = Math.floor(Math.random() * 190 + 10);
  const g = Math.floor(Math.random() * 190 + 10);
  const b = Math.floor(Math.random() * 190 + 10);

  return [`rgba(${r},${g},${b})`, `rgba(${r},${g},${b},0.1)`];
}
