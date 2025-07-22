import { Fontisto } from "@expo/vector-icons";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { StyleSheet, View } from "react-native";
import { Badge, Button, Divider, IconButton, Text } from "react-native-paper";
import { Aktivitaeten_META } from "../../constants/activities";
import { Entry } from "../../types/Entry";

interface Props {
  date: Date;
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
  onAddPress?: () => void;
}

export default function EntryItem({
  date,
  entries,
  onEdit,
  onDelete,
  onAddPress,
}: Props) {
  const weekday = format(date, "EEEE", { locale: de });
  const day = format(date, "dd.MM.");

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.dateHeader}>
        {`${weekday} – ${day}`}
      </Text>

      {entries.map((entry, i) => (
        <View key={i} style={styles.entryContainer}>
          <View style={styles.row}>
            <Badge
              style={{
                backgroundColor:
                  Aktivitaeten_META[entry.activity]?.color || "#ccc",
                color: "white",
              }}
            >
              {entry.activity}
            </Badge>
            <Text>{`${format(new Date(entry.start), "HH:mm")} – ${format(
              new Date(entry.end),
              "HH:mm"
            )}`}</Text>

            <View style={styles.actions}>
              <IconButton
                icon="pencil"
                size={18}
                onPress={() => onEdit(entry)}
              />
              <IconButton
                icon="trash-can"
                size={18}
                onPress={() => onDelete(entry)}
              />
            </View>
          </View>

          {entry.note ? <Text style={styles.note}>📝 {entry.note}</Text> : null}

          <Divider style={{ marginTop: 8 }} />
        </View>
      ))}

      {onAddPress && (
        <Button
          mode="contained"
          onPress={onAddPress}
          icon={() => <Fontisto name="plus-a" size={16} color="white" />}
          contentStyle={{ flexDirection: "row-reverse" }}
        >
          Neuer Eintrag
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateHeader: {
    fontWeight: "600",
    marginBottom: 8,
  },
  entryContainer: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
  },
  note: {
    marginTop: 4,
    fontStyle: "italic",
  },
});
