import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* HERO */}
      <LinearGradient
        colors={["#E5EDF1", "#FFFFFF", "#E5EDF1"]}
        style={styles.hero}
      >
        <LinearGradient colors={["#96C2DB", "#6B9AC4"]} style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={36} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>
          AI-Driven Safety Prediction{"\n"}
          <Text style={styles.titleBlue}>for Drugs & Food</Text>
        </Text>

        <Text style={styles.subtitle}>
          Automated machine learning system to detect drug interactions and
          hazardous food ingredients with confidence scoring.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Ionicons name="medkit" size={18} color="#fff" />
            <Text style={styles.primaryText}> Check Drug Interactions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Ionicons name="nutrition" size={18} color="#1F2A33" />
            <Text style={styles.secondaryText}> Analyze Food Ingredients</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* FEATURES */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>
          Trusted by Researchers & Healthcare Professionals
        </Text>
        <Text style={styles.sectionSubtitle}>
          Advanced ML technology for critical safety decisions
        </Text>

        <View style={styles.featuresRow}>
          {[
            {
              icon: "hardware-chip",
              title: "AI-Powered Analysis",
              text: "Advanced machine learning algorithms for accurate predictions",
            },
            {
              icon: "flash",
              title: "Real-Time Results",
              text: "Instant safety assessments with confidence scoring",
            },
            {
              icon: "lock-closed",
              title: "Research-Grade",
              text: "Academic quality suitable for research and development",
            },
          ].map((f, i) => (
            <LinearGradient
              key={i}
              colors={["#FFFFFF", "#E5EDF1"]}
              style={styles.card}
            >
              <LinearGradient
                colors={["#96C2DB", "#6B9AC4"]}
                style={styles.cardIcon}
              >
                <Ionicons name={f.icon as any} size={22} color="#fff" />
              </LinearGradient>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardText}>{f.text}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* STATS */}
      <LinearGradient colors={["#E5EDF1", "#FFFFFF"]} style={styles.statsRow}>
        {[
          { value: "99.2%", label: "Prediction Accuracy" },
          { value: "50K+", label: "Drug Combinations Analyzed" },
          { value: "10K+", label: "Food Ingredients Tested" },
        ].map((s, i) => (
          <View key={i} style={styles.statBlock}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  hero: {
    paddingTop: 100,
    paddingBottom: 60,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 50,
    textAlign: "center",
    color: "#1F2A33",
  },

  titleBlue: { color: "#6B9AC4" },

  subtitle: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#4B5B66",
    marginTop: 16,
    marginBottom: 30,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 14,
  },

  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: "#6B9AC4",
  },

  primaryText: { color: "#fff", fontFamily: "Poppins-SemiBold" },

  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#96C2DB",
  },

  secondaryText: { color: "#1F2A33", fontFamily: "Poppins-SemiBold" },

  featuresSection: { padding: 24 },

  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 8,
  },

  sectionSubtitle: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#4B5B66",
    marginBottom: 24,
  },

  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },

  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },

  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  cardTitle: { fontFamily: "Poppins-SemiBold", fontSize: 24, marginBottom: 4 },

  cardText: { fontFamily: "Poppins", fontSize: 18, color: "#4B5B66" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
  },

  statBlock: { alignItems: "center" },

  statValue: { fontFamily: "Poppins-Bold", fontSize: 40, color: "#6B9AC4" },

  statLabel: { fontFamily: "Poppins", fontSize: 16, color: "#4B5B66" },
});
