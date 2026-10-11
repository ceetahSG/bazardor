export default function Loading() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <span className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-600" />
    </div>
  );
}
