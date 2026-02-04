import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want to scan?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/scan/food")}
      >
        <Text style={styles.buttonText}>Scan Food Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/scan/cosmetic")}
      >
        <Text style={styles.buttonText}>Scan Cosmetic Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: {
    width: "100%",
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
