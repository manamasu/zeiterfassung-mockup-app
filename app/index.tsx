import { Redirect } from "expo-router";
// This import is needed in our Root to make use of uuid: https://github.com/LinusU/react-native-get-random-values#readme
import "react-native-get-random-values";

export default function Index() {
  return <Redirect href="/(tabs)/time_planner" />;
}
