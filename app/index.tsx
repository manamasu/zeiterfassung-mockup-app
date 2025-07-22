import { Redirect } from "expo-router";
// Import is needed in Root (here) to make use of uuid: https://github.com/LinusU/react-native-get-random-values#readme
import "react-native-get-random-values";

export default function Index() {
  //Redirecting zu (tabs)/time_planner als Initial-Screenview
  return <Redirect href="/(tabs)/time_planner" />;
}
