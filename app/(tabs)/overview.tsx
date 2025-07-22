import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { useEntries } from "../../hooks/EntriesContext";
import { Entry } from "../../types/Entry";
import EntryItem from "../components/EntryItem";

export default function OverviewScreen() {
  const { entries, deleteEntry, updateEntry, reloadEntries } = useEntries();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    reloadEntries(); // call it once on mount
  });

  const now = new Date();
  const past = entries.filter((e) => new Date(e.end) < now);
  const futureAndToday = entries.filter((e) => new Date(e.end) >= now);

  const groupByDate = (entries: Entry[]) => {
    const grouped: Record<string, Entry[]> = {};
    for (const entry of entries) {
      const key = new Date(entry.start).toDateString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    }
    return grouped;
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
                date={new Date(dateKey)}
                entries={grouped[dateKey]}
                onEdit={updateEntry}
                onDelete={deleteEntry}
              />
            </List.Accordion>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {renderSection("Aktuelle & Zukünftige Einträge", futureAndToday)}
      {renderSection("Vergangene Einträge", past)}
    </ScrollView>
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
