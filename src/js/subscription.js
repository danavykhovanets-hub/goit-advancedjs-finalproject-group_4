import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { subscribe } from '../api/requests/subscribe.js';
import { EMAIL_REGEX } from '../constants/index.js';

export function initSubscription() {
  //TODO need to check correct form id for subscription
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
      await subscribe(email);
      iziToast.success({
        title: 'Success',
        message: 'Thanks for subscribing! Check your inbox.',
        position: 'topRight',
      });
      form.reset();
    } catch (error) {
      console.log('ERROR', error);
      iziToast.error({
        title: 'Error',
        message:
          error?.response?.data?.message ??
          'Something went wrong. Please try again later.',
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
