import { StorageService } from './storage.js';

export const FAVORITES_STORAGE_KEY = 'favorites';

/**
 * @typedef {Object} FavoriteExercise
 * @property {string} _id
 * @property {string} name
 * @property {number} burnedCalories
 * @property {number} time
 * @property {string} bodyPart
 * @property {string} target
 */

/**
 * Creates a normalized exercise object for favorites storage.
 *
 * @param {FavoriteExercise} exercise
 * @returns {FavoriteExercise}
 */

export const createFavoriteExercise = exercise => ({
  _id: exercise._id,
  name: exercise.name,
  burnedCalories: exercise.burnedCalories,
  time: exercise.time,
  bodyPart: exercise.bodyPart,
  target: exercise.target,
});

/**
 * localStorage service for the user's favorite exercises.
 * Keeps only the fields required for the favorites card UI.
 * Expected data format: FavoriteExercise[]
 */
export const favoritesStorage = new StorageService(FAVORITES_STORAGE_KEY);
