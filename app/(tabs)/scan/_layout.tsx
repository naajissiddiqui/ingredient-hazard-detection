import { Stack } from "expo-router";

export default function ScanLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Scan" }} />
      <Stack.Screen name="food" options={{ title: "Scan Food" }} />
      <Stack.Screen name="cosmetic" options={{ title: "Scan Cosmetic" }} />
    </Stack>
  );
}
