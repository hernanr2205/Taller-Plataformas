// src/services/exercisesService.ts
export interface Exercise {
  id: number;
  name: string;
  reps: string;
  videoUrl?: string;
}

export interface UpdateExerciseDto {
  name?: string;
  reps?: string;
  videoUrl?: string;
}

// URL base de tu backend
const API_URL = "http://localhost:3000/exercises";

export const exercisesService = {
  // Obtener todos los ejercicios
  async getAllExercises(): Promise<Exercise[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener ejercicios");
    return res.json();
  },

  // Obtener un ejercicio por ID
  async getExerciseById(id: number): Promise<Exercise> {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener el ejercicio");
    return res.json();
  },

  // Actualizar un ejercicio
  async updateExercise(id: number, data: UpdateExerciseDto): Promise<Exercise> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el ejercicio");
    return res.json();
  },
};
