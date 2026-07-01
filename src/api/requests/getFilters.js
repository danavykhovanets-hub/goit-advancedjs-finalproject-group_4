import { instance } from '../instance';

// GET /filters
// params: { filter: 'Muscles' | 'Body parts' | 'Equipment', page, limit }
export async function getFilters(params) {
  const { data } = await instance.get('/filters', { params });
  return data;
}
