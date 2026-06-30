import { initFilters } from './js/filters.js';
import { initQuote } from './js/quote.js';
import { renderCategories } from './js/render.js';
import { initSubscription } from './js/subscription.js';
import { initPagination } from './js/pagination.js';

import './js/modal.js';

/**
 * For those who will use iziToast notifications:
 * Do not forget to add those imports to your files
 * import iziToast from 'izitoast';
 * import 'izitoast/dist/css/iziToast.min.css';
 */

initFilters();
initQuote();
renderCategories();
initSubscription();
initPagination();
