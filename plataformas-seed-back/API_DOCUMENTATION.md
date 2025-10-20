# Fitness App API - Frontend Documentation

**Base URL:** `http://localhost:3001`

## Types

```typescript
export enum Goal {
  LOSE_WEIGHT = 'LOSE_WEIGHT',
  GAIN_MUSCLE = 'GAIN_MUSCLE',
  MAINTAIN = 'MAINTAIN',
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  ACTIVE = 'ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
  weeklyRoutines?: WeeklyRoutine[];
}

export interface Profile {
  id: number;
  goal: Goal;
  activityLevel: ActivityLevel;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Exercise {
  id: number;
  name: string;
  reps: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  weeklyRoutines?: WeeklyRoutine[];
}

export interface WeeklyRoutine {
  id: number;
  dayOfWeek: DayOfWeek;
  completed: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  exercises?: Exercise[];
}
```

## Endpoints

### Users
- `POST /users` - Crear usuario → `User` (incluye perfil automático)
- `GET /users` - Listar usuarios → `User[]`
- `GET /users/:id` - Obtener usuario → `User` (con profile, weeklyRoutines y exercises)
- `PATCH /users/:id` - Actualizar usuario → `User`
- `DELETE /users/:id` - Eliminar usuario → `void`
- `GET /users/:id/routines` - Rutinas del usuario → `WeeklyRoutine[]` (con exercises)

### Profiles
- `GET /profiles/:userId` - Obtener perfil → `Profile` (con user)
- `PATCH /profiles/:userId` - Actualizar perfil → `Profile`

### Exercises
- `POST /exercises` - Crear ejercicio → `Exercise`
- `GET /exercises` - Listar ejercicios → `Exercise[]`
- `GET /exercises/:id` - Obtener ejercicio → `Exercise`
- `PATCH /exercises/:id` - Actualizar ejercicio → `Exercise`
- `DELETE /exercises/:id` - Eliminar ejercicio → `void`

### Routines
- `POST /routines` - Crear rutina → `WeeklyRoutine` (con user y exercises)
- `GET /routines` - Listar rutinas → `WeeklyRoutine[]` (con filtros opcionales)
- `GET /routines/:id` - Obtener rutina → `WeeklyRoutine` (con user y exercises)
- `PATCH /routines/:id` - Actualizar rutina → `WeeklyRoutine` (con user y exercises)
- `DELETE /routines/:id` - Eliminar rutina → `void`
- `PATCH /routines/:id/complete` - Completar rutina → `WeeklyRoutine`
- `POST /routines/:id/exercises` - Agregar ejercicio → `WeeklyRoutine` (con exercises)
- `DELETE /routines/:id/exercises/:exerciseId` - Quitar ejercicio → `WeeklyRoutine` (con exercises)

## Query Parameters
- `GET /routines?dayOfWeek=MONDAY&completed=false&userId=1`

## Request Examples

```typescript
// Crear usuario (automáticamente crea perfil por defecto)
POST /users
{
  "name": "Juan Pérez",
  "email": "juan@example.com", 
  "password": "password123",
  "age": 28,
  "weight": 75.5,
  "height": 175
}

// Actualizar perfil
PATCH /profiles/1
{
  "goal": "GAIN_MUSCLE",
  "activityLevel": "ACTIVE"
}

// Crear ejercicio
POST /exercises
{
  "name": "Sentadilla con Barra",
  "reps": "3 series de 10 repeticiones",
  "videoUrl": "https://example.com/squat-video"
}

// Crear rutina
POST /routines
{
  "dayOfWeek": "MONDAY",
  "notes": "Rutina de pecho y abs",
  "userId": 1,
  "exerciseIds": [1, 2, 3, 4]
}

// Completar rutina
PATCH /routines/1/complete
{
  "completed": true
}

// Agregar ejercicio a rutina
POST /routines/1/exercises
{
  "exerciseId": 5
}
```

## Relaciones

### User ↔ Profile (1:1)
- Al crear un usuario, se crea automáticamente un perfil por defecto
- No hay endpoint POST para crear perfiles independientes
- El perfil se identifica por el `userId` en la URL

### User ↔ WeeklyRoutine (1:N)
- Un usuario puede tener múltiples rutinas
- Las rutinas se filtran por `userId` en query parameters

### WeeklyRoutine ↔ Exercise (N:M)
- Una rutina puede tener múltiples ejercicios
- Un ejercicio puede estar en múltiples rutinas
- Se gestiona mediante `exerciseIds` en el body

## Notas Importantes

1. **Perfiles:** Se crean automáticamente al crear usuario (goal: MAINTAIN, activityLevel: MODERATE)
2. **Relaciones:** Se cargan automáticamente en las respuestas según el endpoint
3. **Filtros:** Solo `/routines` soporta query parameters para filtrar
4. **Validación:** Todos los endpoints validan datos de entrada
5. **Cascada:** Eliminar usuario elimina su perfil y rutinas
