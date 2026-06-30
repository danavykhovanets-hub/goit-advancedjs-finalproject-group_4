import { instance } from '../instance';

// PATCH /exercises/{id}/rating
// data: { rate: number, email: string, review: string }
export async function addRating(id, data) {
  const { data: result } = await instance.patch(
    `/exercises/${id}/rating`,
    data
  );
  return result;
}
