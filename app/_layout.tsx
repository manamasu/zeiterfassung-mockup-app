import { EntriesProvider } from "@/hooks/EntriesContext";
import { Slot } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={AppTheme}>
      <EntriesProvider>
        <Slot />
      </EntriesProvider>
    </PaperProvider>
  );
}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fefefe", // Light, clean background
    primary: "#1976d2", // Accent color
    secondary: "#388e3c",
    surface: "#ffffff",
    text: "#111111", // Darker text for contrast
    onSurface: "#111111",
    placeholder: "#888",
  },
};
