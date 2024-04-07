import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeValueInAsync = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error for store data in async-storage :', e);
  }
};

export const getValueInAsync = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error for getting data from async-storage :', e);
  }
};
