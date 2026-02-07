import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CosmeticScanOptionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cosmetics Scan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={50} color="#2563EB" />
          </View>
          <Text style={styles.title}>Check Beauty Product Safety</Text>
          <Text style={styles.subtitle}>
            Scan your cosmetic products to detect harmful chemicals and skin
            irritants instantly.
          </Text>
        </View>

        {/* Scan by Barcode */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Scan by Barcode</Text>
              <Text style={styles.cardDescription}>
                Instantly analyze product safety ratings.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/scan/cosmetics")}
              >
                <Text style={styles.primaryButtonText}>Scan Now</Text>
                <Ionicons name="barcode-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.iconBox}>
                <Ionicons name="barcode" size={70} color="#333" />
              </View>
            </View>
          </View>
        </View>

        {/* Scan Ingredient Label */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Scan Ingredient Label</Text>
              <Text style={styles.cardDescription}>
                Detect parabens, sulfates & harmful ingredients.
              </Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/scan/cosmetics")}
              >
                <Text style={styles.secondaryButtonText}>Scan Label</Text>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#2563EB"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.roundIconBox}>
                <Ionicons name="flask" size={60} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        {/* Help */}
        <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpText}>How does cosmetic scanning work?</Text>
          <Ionicons name="help-circle-outline" size={20} color="#2563EB" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2FF", // light blue background
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E3A8A", // dark blue
  },

  placeholder: {
    width: 36,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DBEAFE", // soft blue
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1E3A8A",
  },

  cardDescription: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#2563EB", // main blue
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: "#DBEAFE", // light blue
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },

  cardRight: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconBox: {
    width: 100,
    height: 100,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  roundIconBox: {
    width: 100,
    height: 100,
    backgroundColor: "#2563EB",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  helpLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
  },

  helpText: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "500",
  },
});
