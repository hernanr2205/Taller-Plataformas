// Layout para rutas /profiles/*
export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">👤 Gestión de Perfiles</h1>
        {children}
      </div>
    </div>
  );
}
