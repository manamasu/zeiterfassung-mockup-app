import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { useEntries } from "../../hooks/EntriesContext";
import { Entry } from "../../types/Entry";
import EntryItem from "../components/EntryItem";
import EntryModal from "../components/EntryModal";

export default function OverviewScreen() {
  const { entries, addEntry, deleteEntry, updateEntry, reloadEntries } =
    useEntries();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [modalDate, setModalDate] = useState<Date>(new Date());
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    reloadEntries();
  }, []);

  const now = new Date();
  const past = entries.filter((e) => new Date(e.end) < now);
  // const futureAndToday = entries.filter((e) => new Date(e.end) >= now);

  const groupByDate = (entries: Entry[]) => {
    const grouped: Record<string, Entry[]> = {};
    for (const entry of entries) {
      const key = format(new Date(entry.start), "yyyy-MM-dd");
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    }
    return grouped;
  };

  const handleEditEntry = (entry: Entry, date: Date) => {
    setSelectedEntry(entry);
    setModalDate(date);
    setModalVisible(true);
  };

  const handleSaveEntry = async (entry: Entry) => {
    if (selectedEntry) {
      await updateEntry(entry);
    } else {
      await addEntry(entry);
    }
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const renderSection = (title: string, data: Entry[]) => {
    const grouped = groupByDate(data);
    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return (
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          {title}
        </Text>

        {sortedDates.map((dateKey) => {
          const date = new Date(dateKey);
          const isExpanded = expandedSections[dateKey] ?? true;

          return (
            <List.Accordion
              key={dateKey}
              title={dateKey}
              expanded={isExpanded}
              onPress={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  [dateKey]: !prev[dateKey],
                }))
              }
              titleStyle={styles.accordionTitle}
            >
              <EntryItem
                date={date}
                entries={grouped[dateKey]}
                onEdit={(entry) => handleEditEntry(entry, date)}
                onDelete={deleteEntry}
              />
            </List.Accordion>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* {renderSection("Aktuelle & Zukünftige Einträge", futureAndToday)} */}
        {renderSection("Vergangene Einträge", past)}
      </ScrollView>

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

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  accordionTitle: {
    fontWeight: "500",
    paddingLeft: 8,
  },
});
