import { instance } from '../instance';

// GET /quote — цитата дня
export async function getQuote() {
  const { data } = await instance.get('/quote');
  return data;
}
