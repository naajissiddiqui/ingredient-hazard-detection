import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FoodScanOptionsScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#6B9AC4" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Food Scan Options</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark" size={48} color="#6B9AC4" />
          </View>

          <Text style={styles.title}>Analyze Safety Instantly</Text>

          <Text style={styles.subtitle}>
            Point your camera at the product barcode or ingredient list to see
            health insights.
          </Text>
        </View>

        {/* CARD 1 */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Scan by Barcode</Text>
              <Text style={styles.cardDescription}>
                Identify thousands of products instantly.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.primaryButton}
                onPress={() => router.push("/scan/barcode")}
              >
                <Text style={styles.primaryButtonText}>Scan Now</Text>
                <Ionicons name="barcode-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.iconBox}>
              <Ionicons name="barcode" size={70} color="#6B9AC4" />
            </View>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Scan Ingredient Label</Text>
              <Text style={styles.cardDescription}>
                Detect harmful additives in real-time.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.secondaryButton}
                onPress={() => router.push("/scan/food")}
              >
                <Text style={styles.secondaryButtonText}>Scan Label</Text>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#6B9AC4"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.iconBoxDark}>
              <Ionicons name="document-text" size={60} color="#fff" />
            </View>
          </View>
        </View>

        {/* HELP */}
        <TouchableOpacity activeOpacity={0.7} style={styles.helpLink}>
          <Text style={styles.helpText}>Which one should I choose?</Text>
          <Ionicons name="help-circle-outline" size={20} color="#6B9AC4" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EDF1",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1F2A33",
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#E5EDF1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    color: "#1F2A33",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#4B5B66",
    textAlign: "center",
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1F2A33",
    marginBottom: 6,
  },

  cardDescription: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#4B5B66",
    marginBottom: 16,
  },

  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#F5F8FB",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBoxDark: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#6B9AC4",
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B9AC4",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },

  primaryButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#fff",
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5EDF1",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },

  secondaryButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#6B9AC4",
  },

  helpLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  helpText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#6B9AC4",
  },
});
