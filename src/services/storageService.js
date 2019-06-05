import { AsyncStorage } from 'react-native';

export const storageService = {
  setItem: async (item, value) => {
    try {
      await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
      console.warn(`Cannot setItem ${item}, ${error}`);
    }
  },
  getItem: async key => {
    let item;
    try {
      item = await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn(`Cannot getItem ${key}, ${error}`);
    }
    return JSON.parse(item);
  },
  mergeItem: async (key, value) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Cannot mergeItem ${key}, ${error}`);
    }
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(`Cannot remove ${key}, ${error}`);
    }
  },
};
