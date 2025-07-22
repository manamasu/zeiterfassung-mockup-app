import { formatTimeShort } from "@/utils/date";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import "react-native-get-random-values";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { v4 as uuidv4 } from "uuid";
import {
  AktitvitaetType,
  AKTIVITATEN_OPTIONS,
} from "../../constants/activities";
import { Entry } from "../../types/Entry";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSave: (entry: Entry) => void;
  initialEntry?: Entry | null;
};

export default function EntryModal({
  visible,
  onDismiss,
  onSave,
  initialEntry,
}: Props) {
  const [activity, setActivity] = useState<AktitvitaetType | undefined>(
    undefined
  );
  const [note, setNote] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

  useEffect(() => {
    if (!visible) return;

    if (initialEntry) {
      setActivity(initialEntry.activity);
      setNote(initialEntry.note || "");
      setStartTime(new Date(initialEntry.start));
      setEndTime(new Date(initialEntry.end));
    } else {
      reset();
    }
  }, [visible, initialEntry]);

  const reset = () => {
    setActivity(undefined);
    setStartTime(new Date());
    setEndTime(new Date());
    setNote("");
    setPickerMode(null);
  };

  const handleConfirm = (date: Date) => {
    if (pickerMode === "start") setStartTime(date);
    else if (pickerMode === "end") setEndTime(date);
    setPickerMode(null);
  };

  const handleSave = () => {
    if (!activity) return;

    const newEntry: Entry = {
      id: initialEntry?.id ?? uuidv4(),
      activity,
      start: startTime,
      end: endTime,
      note,
    };

    onSave(newEntry); // Saving will be handled outside, then modal will be dismissed.
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.header}>
                <Button onPress={onDismiss}>Abbrechen</Button>
                <Button onPress={handleSave} disabled={!activity}>
                  Speichern
                </Button>
              </View>

              <Dropdown
                hideMenuHeader
                label="Aktivität"
                placeholder="Wähle Aktivität"
                value={activity}
                options={AKTIVITATEN_OPTIONS}
                onSelect={(val) => setActivity(val as AktitvitaetType)}
              />

              <Divider style={{ marginVertical: 16 }} />

              <View style={styles.timeRow}>
                <Text>Startzeit: </Text>
                <Button mode="outlined" onPress={() => setPickerMode("start")}>
                  {formatTimeShort(startTime)}
                </Button>
              </View>

              <View style={styles.timeRow}>
                <Text>Endzeit: </Text>
                <Button mode="outlined" onPress={() => setPickerMode("end")}>
                  {formatTimeShort(endTime)}
                </Button>
              </View>

              {pickerMode && (
                <DateTimePickerModal
                  isVisible={true}
                  onCancel={() => setPickerMode(null)}
                  onConfirm={handleConfirm}
                  date={pickerMode === "start" ? startTime : endTime}
                  mode="time"
                  is24Hour
                />
              )}

              <TextInput
                label="Notiz"
                mode="outlined"
                value={note}
                onChangeText={setNote}
                multiline
                style={{ marginBottom: 16 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
