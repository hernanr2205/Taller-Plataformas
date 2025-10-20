import Link from "next/link";

type Exercise = {
  id: number;
  name: string;
  reps: string;
  videoUrl?: string;
};

async function getExercise(id: string): Promise<Exercise> {
  const res = await fetch(`http://localhost:3000/exercises/${id}`, {
    // evita caché mientras desarrollas
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar el ejercicio");
  }

  return res.json();
}

export default async function ExerciseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const exercise = await getExercise(params.id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/exercises" className="text-blue-600 hover:underline">
        ← Volver al listado
      </Link>

      <h1 className="text-3xl font-bold mt-4">{exercise.name}</h1>

      <p className="mt-4">
        <strong>Repeticiones:</strong> {exercise.reps}
      </p>

      {exercise.videoUrl && (
        <p className="mt-2">
          <strong>Video:</strong>{" "}
          <a
            href={exercise.videoUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Ver video
          </a>
        </p>
      )}

      <div className="mt-6">
        <Link
          href={`/exercises/${exercise.id}/edit`}
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
        >
          Editar ejercicio
        </Link>
      </div>
    </main>
  );
}
