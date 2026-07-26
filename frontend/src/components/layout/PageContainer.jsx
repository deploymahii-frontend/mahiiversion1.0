export default function PageContainer({ children }) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      {children}
    </main>
  );
}
