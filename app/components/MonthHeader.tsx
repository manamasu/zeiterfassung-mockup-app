import { Fontisto } from "@expo/vector-icons";
import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { formatDateToMonthYear } from "../../utils/date";

export default function MonthHeader() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.headerContainer}>
      <Button
        onPress={() => setDate(subMonths(date, 1))}
        icon={() => <Fontisto name="angle-left" size={24} color="black" />}
      >
        l
      </Button>
      <Text>{formatDateToMonthYear(date)}</Text>
      <Button
        onPress={() => setDate(addMonths(date, 1))}
        icon={() => <Fontisto name="angle-right" size={24} color="black" />}
      >
        r
      </Button>
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
