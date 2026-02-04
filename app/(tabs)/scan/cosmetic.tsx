import { StyleSheet, Text, View } from "react-native";

export default function CosmeticScan() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cosmetic Scanner Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
