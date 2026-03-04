export default function CoursesLoadingFr() {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center px-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-rhc-primary-dark border-t-transparent"
        aria-hidden
      />
      <p className="mt-4 text-sm font-medium text-slate-600">Chargement du cours…</p>
    </div>
  );
}
