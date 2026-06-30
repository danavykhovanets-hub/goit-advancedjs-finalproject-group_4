import { instance } from '../instance';

// POST /subscription
// data: { email: string }
export async function subscribe(email) {
  const { data } = await instance.post('/subscription', { email });
  return data;
}
