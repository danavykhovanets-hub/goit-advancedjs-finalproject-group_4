import { instance } from '../instance';

// GET /exercises/{id}
export async function getExerciseById(id) {
  const { data } = await instance.get(`/exercises/${id}`);
  return data;
}
