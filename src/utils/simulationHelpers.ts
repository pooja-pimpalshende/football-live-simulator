export function clearSimInterval(ref: React.RefObject<NodeJS.Timeout | null>) {
  if (ref.current) {
    clearInterval(ref.current);
    ref.current = null;
  }
}
