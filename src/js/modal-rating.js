import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { addRating } from '../api/requests/addRating.js';
import { parseError } from '../lib/parseError.js';

export async function submitRating(id, data) {
  try {
    return await addRating(id, data);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: getErrorMessage(error),
      position: 'topRight',
    });
    return null;
  }
}

function getErrorMessage(error) {
  const { status, message } = parseError(error);

  switch (status) {
    case 400:
      return message ?? 'Invalid request. Please check the rating data.';
    case 404:
      return message ?? 'Such exercise was not found.';
    case 409:
      return message ?? 'This email has already left a rating.';
    case 500:
      return message ?? 'Server error. Please try again later.';
    default:
      return message ?? 'Failed to add the rating.';
  }
}

export function initRatingModal() {
  // TODO: implement rating modal rendering
}
