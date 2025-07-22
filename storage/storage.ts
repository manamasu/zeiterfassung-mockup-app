import { Entry } from "@/types/Entry";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "entries";

export const saveEntry = async (entry: Entry) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed: Entry[] = stored ? JSON.parse(stored) : [];
    parsed.push(entry);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.error("Error savint entry: ", e);
  }
};

export const loadEntries = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error loading entries: ", e);
    return [];
  }
};

export const clearEntries = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
