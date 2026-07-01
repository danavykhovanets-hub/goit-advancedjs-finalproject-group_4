export class StorageService {
  constructor(key, storage = localStorage) {
    this.key = key;
    this.storage = storage;
  }

  load = defaultValue => {
    try {
      const savedValue = this.storage.getItem(this.key);

      if (savedValue === null) {
        return defaultValue;
      }

      return JSON.parse(savedValue);
    } catch (error) {
      console.error(
        `Failed to read data from localStorage by key "${this.key}"`,
        error
      );
      return defaultValue;
    }
  };

  save = value => {
    try {
      this.storage.setItem(this.key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(
        `Failed to save data to localStorage by key "${this.key}"`,
        error
      );
      return false;
    }
  };

  remove = () => {
    try {
      this.storage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error(
        `Failed to remove data from localStorage by key "${this.key}"`,
        error
      );
      return false;
    }
  };
}
