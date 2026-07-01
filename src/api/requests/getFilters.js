import { instance } from '../instance';

const DEFAULT_FILTER = 'Muscles';
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

// GET /filters
// params: { filter: 'Muscles' | 'Body parts' | 'Equipment', page, limit }
export async function getFilters({
  filter = DEFAULT_FILTER,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
} = {}) {
  const { data } = await instance.get('/filters', {
    params: {
      filter,
      page,
      limit,
    },
  });

  return data;
}
