export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-3 bg-white/80 shadow-sm">{children}</div>)
}
