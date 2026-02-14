import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResultsScreen() {
  const { analysis } = useLocalSearchParams();

  const parsed = typeof analysis === "string" ? JSON.parse(analysis) : null;

  const harmful = parsed?.harmful_ingredients || [];

  const totalIngredients = parsed?.total_ingredients || 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredient Analysis</Text>

      <Text style={styles.sub}>Total Ingredients: {totalIngredients}</Text>

      <Text style={styles.sectionTitle}>Harmful Ingredients Detected</Text>

      {harmful.length === 0 ? (
        <Text style={styles.safeText}>No harmful ingredients detected</Text>
      ) : (
        harmful.map((item: any, index: number) => (
          <View key={index} style={styles.card}>
            <Text style={styles.ingredient}>{item.ingredient}</Text>

            {item.hazards.map((h: any, i: number) => (
              <Text key={i} style={styles.hazard}>
                {h.label} — {(h.confidence * 100).toFixed(1)}%
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  sub: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFE5E5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  ingredient: {
    fontWeight: "700",
    marginBottom: 6,
  },
  hazard: {
    color: "#B00020",
  },
  safeText: {
    color: "green",
  },
});
