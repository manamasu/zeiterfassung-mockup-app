import { Fontisto } from "@expo/vector-icons";
import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { formatDateToMonthYear } from "../../utils/date";

export default function MonthHeader() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.headerContainer}>
      <IconButton
        onPress={() => setDate(subMonths(date, 1))}
        icon={() => <Fontisto name="angle-left" size={24} color="black" />}
      />
      <Text variant="titleMedium">{formatDateToMonthYear(date)}</Text>
      <IconButton
        onPress={() => setDate(addMonths(date, 1))}
        icon={() => <Fontisto name="angle-right" size={24} color="black" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});
