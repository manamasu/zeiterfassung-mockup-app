import { format } from "date-fns";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useEntries } from "../../hooks/EntriesContext";
import { Entry } from "../../types/Entry";
import EntryItem from "../components/EntryItem";
import EntryModal from "../components/EntryModal";
import MonthHeader from "../components/MonthHeader";
import TimerFAB from "../components/TimerFAB";

export default function TimePlannerScreen() {
  // CRUD operations for entries from context
  const { entries, addEntry, deleteEntry, updateEntry } = useEntries();

  // Modal state for editing and creating entries
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState<Date>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  /**
   * Die Funktion gruppiert alle "entries" anhand ihres startDate formattiert mit "yyyy-MM-dd
   * Erstellt ein mapping wie folgt:
   * {
   *    "2025-07-22": [entry1, entry2]
   *    "2025-07-21": [entry3]
   * }
   */
  const entriesByDay = useMemo(() => {
    const grouped: Record<string, Entry[]> = {};
    for (const entry of entries) {
      const key = format(new Date(entry.start), "yyyy-MM-dd");
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    }
    return grouped;
  }, [entries]);

  const handleSaveEntry = async (newEntry: Entry) => {
    if (selectedEntry) {
      await updateEntry(newEntry);
    } else {
      await addEntry(newEntry);
    }
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const handleAddPress = (date: Date) => {
    setModalDate(date);
    setSelectedEntry(null);
    setModalVisible(true);
  };

  const handleEditEntry = (entry: Entry, date: Date) => {
    setModalDate(date);
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const entryKeys = useMemo(
    () => Object.keys(entriesByDay).sort().reverse(),
    [entriesByDay]
  );

  const todayKey = format(new Date(), "yyyy-MM-dd");

  return (
    <View style={{ flex: 1 }}>
      <MonthHeader />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {entryKeys.map((key) => {
          const date = new Date(key);
          return (
            <EntryItem
              key={key}
              date={date}
              entries={entriesByDay[key]}
              onAddPress={() => handleAddPress(date)}
              onDelete={deleteEntry}
              onEdit={(entry) => handleEditEntry(entry, modalDate)}
            />
          );
        })}

        {!entriesByDay[todayKey] && (
          <EntryItem
            date={new Date()}
            entries={[]}
            onAddPress={() => handleAddPress(new Date())}
            onDelete={deleteEntry}
            onEdit={(entry) => handleEditEntry(entry, modalDate)}
          />
        )}
      </ScrollView>

      <TimerFAB />

      <EntryModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setSelectedEntry(null);
        }}
        onSave={handleSaveEntry}
        initialEntry={selectedEntry}
      />
    </View>
  );
}
