import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResultsScreen() {
  const { analysis } = useLocalSearchParams();

  const parsed = typeof analysis === "string" ? JSON.parse(analysis) : null;

  const harmful = parsed?.results || [];
  const totalIngredients = parsed?.total_ingredients || 0;

  const harmfulCount = harmful.length;

  const safetyScore =
    totalIngredients > 0
      ? Math.round(100 - (harmfulCount / totalIngredients) * 100)
      : 100;

  let riskLabel = "Low Risk";
  let riskColor = "#2ECC71";

  if (safetyScore < 50) {
    riskLabel = "High Risk";
    riskColor = "#E74C3C";
  } else if (safetyScore < 80) {
    riskLabel = "Moderate Risk";
    riskColor = "#F39C12";
  }

  const isCosmetic =
    harmful.length > 0 &&
    ["high_risk", "moderate_risk", "paraben", "formaldehyde_releaser"].includes(
      harmful[0]?.hazards?.[0]?.label,
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredient Analysis</Text>

      {/* Safety Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Safety Score</Text>

        <View style={styles.scoreRow}>
          <Text style={styles.score}>{safetyScore}</Text>
          <Text style={styles.scoreOut}>/100</Text>
        </View>

        <View style={styles.riskRow}>
          <View style={[styles.dot, { backgroundColor: riskColor }]} />
          <Text style={[styles.riskText, { color: riskColor }]}>
            {riskLabel}
          </Text>
        </View>
      </View>

      {/* Total Ingredients */}
      <Text style={styles.total}>Total Ingredients: {totalIngredients}</Text>

      {/* Section */}
      <Text style={styles.sectionTitle}>Detected Concerns</Text>

      {harmful.length === 0 ? (
        <Text style={styles.safeText}>No harmful ingredients detected</Text>
      ) : (
        harmful.map((item: any, index: number) => {
          const labels = item.hazards?.map((h: any) => h.label) || [];
          const label = labels[0] || "";
          let riskType = "Low Risk";
          let color = "#F4D03F";

          if (isCosmetic) {
            if (
              labels.includes("high_risk") ||
              labels.includes("paraben") ||
              labels.includes("formaldehyde_releaser")
            ) {
              riskType = "High Risk";
              color = "#E74C3C";
            } else if (
              labels.includes("moderate_risk") ||
              labels.includes("preservative") ||
              labels.includes("fragrance_allergen")
            ) {
              riskType = "Moderate Risk";
              color = "#F39C12";
            }
          } else {
            const label = labels[0] || "";

            if (label.includes("sugar") || label.includes("color")) {
              riskType = "High Risk";
              color = "#E74C3C";
            } else if (
              label.includes("preservative") ||
              label.includes("fat")
            ) {
              riskType = "Moderate Risk";
              color = "#F39C12";
            }
          }

          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={[styles.riskBadge, { color }]}>{riskType}</Text>
              </View>

              <Text style={styles.ingredient}>{item.ingredient}</Text>

              <Text style={styles.description}>
                Detected as {label.replaceAll("_", " ")}
              </Text>

              {/* 🔥 ADD THIS BELOW */}
              {item.personalized &&
                item.personalized.length > 0 &&
                item.personalized.map((p: any, i: number) => (
                  <Text key={i} style={{ color: "#E74C3C", marginTop: 6 }}>
                    ⚠️ Not safe for {p.condition.toUpperCase()} : {p.reason}
                  </Text>
                ))}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  scoreTitle: {
    fontSize: 14,
    color: "#6B7A90",
    marginBottom: 6,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  score: {
    fontSize: 40,
    fontWeight: "800",
  },

  scoreOut: {
    fontSize: 18,
    marginLeft: 6,
    color: "#6B7A90",
  },

  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 6,
  },

  riskText: {
    fontSize: 16,
    fontWeight: "700",
  },

  total: {
    fontSize: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },

  cardHeader: {
    marginBottom: 6,
  },

  riskBadge: {
    fontWeight: "700",
    fontSize: 12,
  },

  ingredient: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  description: {
    color: "#6B7A90",
  },

  safeText: {
    color: "green",
    fontSize: 16,
  },
});
