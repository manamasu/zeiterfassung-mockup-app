import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Entry } from "../types/Entry";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EntriesContextType {
  entries: Entry[];
  addEntry: (entry: Entry) => Promise<void>;
  updateEntry: (entry: Entry) => Promise<void>;
  deleteEntry: (entry: Entry) => Promise<void>;
  reloadEntries: () => Promise<void>;
}

const STORAGE_KEY = "entries";

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Load entries from storage
  const loadEntries = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: Entry[] = stored ? JSON.parse(stored) : [];
      setEntries(parsed);
    } catch (e) {
      console.error("Error loading entries", e);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Save entries to storage and update state
  const saveEntries = async (updated: Entry[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEntries(updated);
    } catch (e) {
      console.error("Error saving entries", e);
    }
  };

  const addEntry = async (entry: Entry) => {
    const updated = [...entries, entry];
    await saveEntries(updated);
  };

  const updateEntry = async (edited: Entry) => {
    const updated = entries.map((e) => (e.id === edited.id ? edited : e));
    await saveEntries(updated);
  };

  const deleteEntry = async (entryToDelete: Entry) => {
    const updated = entries.filter((e) => e.id !== entryToDelete.id);
    await saveEntries(updated);
  };

  const reloadEntries = async () => {
    await loadEntries();
  };

  return (
    <EntriesContext.Provider
      value={{ entries, addEntry, updateEntry, deleteEntry, reloadEntries }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export function useEntries() {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error("useEntries must be used within an EntriesProvider");
  }
  return context;
}
