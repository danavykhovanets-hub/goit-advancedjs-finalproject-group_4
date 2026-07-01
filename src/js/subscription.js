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
      const data = await subscribe(email);
      iziToast.success({
        title: 'Success',
        message: data?.message ?? 'Thanks for subscribing!',
        position: 'topRight',
      });
      form.reset();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: getErrorMessage(error),
        position: 'topRight',
      });
    } finally {
      setLoading(button, false);
    }
  });
}

function getErrorMessage(error) {
  const status = error?.response?.status;
  const serverMessage = error?.response?.data?.message;

  switch (status) {
    case 400:
      return serverMessage ?? 'Invalid request. Please check your email.';
    case 404:
      return serverMessage ?? 'Subscription service was not found.';
    case 409:
      return serverMessage ?? 'This email is already subscribed.';
    case 500:
      return serverMessage ?? 'Server error. Please try again later.';
    default:
      return serverMessage ?? 'Something went wrong. Please try again later.';
  }
}

function setLoading(button, isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Sending...' : 'Send';
}
