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

export default function FoodScanOptionsScreen() {
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
          <Ionicons name="chevron-back" size={28} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Food Scan Options</Text>
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
            <Ionicons name="shield-checkmark" size={50} color="#007AFF" />
          </View>
          <Text style={styles.title}>Analyze safety instantly</Text>
          <Text style={styles.subtitle}>
            Point your camera at the product's barcode or ingredient list to see
            health insights.
          </Text>
        </View>

        {/* Scan by Barcode */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>Scan by Barcode</Text>
              <Text style={styles.cardDescription}>
                Quickly identify thousands of products.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/scan/food")}
              >
                <Text style={styles.primaryButtonText}>Scan Now</Text>
                <Ionicons name="barcode-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.barcodeContainer}>
                <Ionicons name="barcode" size={80} color="#333" />
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
                Detect harmful additives in real-time.
              </Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/scan/food")}
              >
                <Text style={styles.secondaryButtonText}>Scan Label</Text>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.labelContainer}>
                <Ionicons name="document-text" size={60} color="#666" />
              </View>
            </View>
          </View>
        </View>

        {/* Help */}
        <TouchableOpacity style={styles.helpLink}>
          <Text style={styles.helpText}>Which one should I choose?</Text>
          <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
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
    color: "#000",
  },
  placeholder: {
    width: 36,
  },

  /* 🔑 SCROLL FIX */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60, // IMPORTANT for scroll
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
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
  },
  cardDescription: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
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
    backgroundColor: "#E3F2FD",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cardRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#2C2C2C",
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
    color: "#007AFF",
    fontWeight: "500",
  },
});
