import { instance } from '../instance';

// GET /exercises
// params: { bodypart, muscles, equipment, keyword, page, limit }
export async function getExercisesByCategory(params) {
  const { data } = await instance.get('/exercises', { params });
  return data;
}
