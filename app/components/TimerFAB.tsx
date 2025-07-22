import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, FAB, Portal, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { v4 as uuidv4 } from "uuid";
import {
  AKTIVITATEN_OPTIONS,
  AktitvitaetType,
} from "../../constants/activities";
import { useEntries } from "../../hooks/EntriesContext";

export default function TimerFAB() {
  const { addEntry } = useEntries();

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [activityDialogVisible, setActivityDialogVisible] = useState(false);
  const [noteDialogVisible, setNoteDialogVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    AktitvitaetType | undefined
  >(undefined);
  const [note, setNote] = useState("");

  const handleStart = () => {
    setActivityDialogVisible(true);
  };

  const confirmStart = () => {
    if (!selectedActivity) return;
    setActivityDialogVisible(false);
    setStartTime(new Date());
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setNoteDialogVisible(true);
  };

  const confirmStop = async () => {
    if (!startTime || !selectedActivity) return;

    const endTime = new Date();

    await addEntry({
      id: uuidv4(),
      activity: selectedActivity,
      start: startTime,
      end: endTime,
      note,
    });

    // Reset everything
    setStartTime(null);
    setSelectedActivity(undefined);
    setNote("");
    setNoteDialogVisible(false);
  };

  return (
    <>
      <FAB
        style={styles.fab}
        icon={isRunning ? "stop" : "play"}
        label={isRunning ? "Stop" : "Start"}
        onPress={isRunning ? handleStop : handleStart}
      />

      <Portal>
        {/* Activity Dropdown Dialog */}
        <Dialog
          visible={activityDialogVisible}
          onDismiss={() => setActivityDialogVisible(false)}
        >
          <Dialog.Title>Aktivität wählen</Dialog.Title>
          <Dialog.Content>
            <Dropdown
              hideMenuHeader
              label="Aktivität"
              placeholder="Wähle Aktivität"
              value={selectedActivity}
              options={AKTIVITATEN_OPTIONS}
              onSelect={(val) => setSelectedActivity(val as AktitvitaetType)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setActivityDialogVisible(false)}>
              Abbrechen
            </Button>
            <Button onPress={confirmStart} disabled={!selectedActivity}>
              Starten
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Optional Note Dialog */}
        <Dialog
          visible={noteDialogVisible}
          onDismiss={() => setNoteDialogVisible(false)}
        >
          <Dialog.Title>Notiz hinzufügen</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Notiz"
              value={note}
              onChangeText={setNote}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setNoteDialogVisible(false)}>
              Abbrechen
            </Button>
            <Button onPress={confirmStop}>Speichern</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
});
