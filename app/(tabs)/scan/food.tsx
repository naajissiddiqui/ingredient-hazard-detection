import { StyleSheet, Text, View } from "react-native";

export default function FoodScan() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Food Scanner Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
