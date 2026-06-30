import 'star-rating.js/dist/star-rating.min.css';
import StarRating from 'star-rating.js';

const refs = {
  modalOpenBtn: document.querySelector('[data-modal-open]'),
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  overlay: document.querySelector('.overlay'),
  modalContent: document.querySelector('.modal_content'),
};

// Temporary mock data for testing purposes.
// Will be removed when the modal is switched to the favorites section.
const mockExerciceData = {
  _id: '64f389465ae26083f39b17a2',
  bodyPart: 'waist',
  equipment: 'body weight',
  gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0001.gif',
  name: '3/4 sit-up',
  target: 'abs',
  description:
    "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
  rating: 3.72,
  burnedCalories: 220,
  time: 3,
  popularity: 34157,
};

// #region HTML rendering functions
const renderExerciceModal = ({
  name,
  gifUrl,
  rating,
  target,
  bodyPart,
  equipment,
  popularity,
  burnedCalories,
  description,
}) => {
  const selectedRating = Math.round(rating);

  const modalData = `<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${gifUrl}"
        alt="${name}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${name}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${rating}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${selectedRating === 5 ? 'selected' : ''}>Excellent</option>
           <option value="4" ${selectedRating === 4 ? 'selected' : ''}>Very Good</option>
           <option value="3" ${selectedRating === 3 ? 'selected' : ''}>Average</option>
           <option value="2" ${selectedRating === 2 ? 'selected' : ''}>Poor</option>
           <option value="1" ${selectedRating === 1 ? 'selected' : ''}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${target}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${bodyPart}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${equipment}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${popularity}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${burnedCalories}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${description}</p>
      <div class="modal_exercice_btn_container">
        <button class="modal_exercice_btn_favorites" type="button">
          Add to favorites
          <svg class="modal_exercice_btn_favorites_icon" width="20" height="20">
            <use href="./img/icons.svg#heart"></use>
          </svg>
        </button>
        <button class="modal_exercice_btn_rating" type="button">
          Give a rating
        </button>
      </div>
    </div>
  </div>`;

  requestAnimationFrame(() => {
    const stars = new StarRating('.star-rating', {
      clearable: false,
      maxStars: 5,
    });
    stars.rebuild();
  });
  return modalData;
};
// #endregion  HTML rendering functions

// #region Base modal opening functionality
export const onModalOpen = event => {
  const modalType = event.target.dataset.modalType;
  if (!modalType) return;

  refs.overlay.hidden = false;
  refs.modalContent.innerHTML = renderExerciceModal(mockExerciceData);
};

export const onModalClose = () => {
  refs.overlay.hidden = true;
};

const onOverlayClick = e => {
  if (e.target === refs.overlay) {
    onModalClose();
  }
};

const onEscapeKeyClick = e => {
  if (e.key === 'Escape') {
    onModalClose();
  }
};
// #endregion Base modal opening functionality

// #region Adding global event listeners
refs.modalOpenBtn.addEventListener('click', onModalOpen);
refs.modalCloseBtn.addEventListener('click', onModalClose);
refs.overlay.addEventListener('click', onOverlayClick);
document.addEventListener('keydown', onEscapeKeyClick);
// #endregion Adding global event listeners
