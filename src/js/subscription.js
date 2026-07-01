import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { subscribe } from '../api/requests/subscribe.js';
import { EMAIL_REGEX } from '../constants/index.js';

function getResponseMessage(data, fallback) {
  if (typeof data === 'string') return data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  return fallback;
}

export function initSubscription() {
  const form = document.querySelector('[data-subscribe-form]');
  if (!form) return;

  const input = form.elements.email;
  const button = form.querySelector('.subscribe-btn');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const email = input.value.trim();

    if (!EMAIL_REGEX.test(email)) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid email address.',
        position: 'topRight',
      });
      input.focus();
      return;
    }

    setLoading(button, true);

    try {
      const data = await subscribe(email);
      iziToast.success({
        title: 'Success',
        message: getResponseMessage(data, 'Subscription successful.'),
        position: 'topRight',
      });
      form.reset();
    } catch (error) {
      const status = error?.response?.status;
      const message = getResponseMessage(
        error?.response?.data,
        'Something went wrong. Please try again later.'
      );

      iziToast[status === 409 ? 'warning' : 'error']({
        title: status === 409 ? 'Warning' : 'Error',
        message,
        position: 'topRight',
      });
    } finally {
      setLoading(button, false);
    }
  });
}

function setLoading(button, isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Sending...' : 'Send';
}
