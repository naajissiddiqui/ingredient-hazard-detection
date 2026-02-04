import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 🔵 Top Logo */}
      <Text style={styles.logo}>SAFECHOICE</Text>
      <View style={styles.logoUnderline} />

      {/* 🖼 Hero Card */}
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/hero.png")}
          style={styles.image}
          resizeMode="cover"
        />

        {/* ✅ Floating Verified Badge */}
        <View style={styles.badge}>
          <View style={styles.badgeIcon}>
            <Ionicons name="checkmark" size={18} color="green" />
          </View>
          <Text style={styles.badgeText}>VERIFIED SAFE</Text>
        </View>
      </View>

      {/* 📝 Headline */}
      <Text style={styles.heading}>
        Understand{"\n"}
        <Text style={styles.blue}>What You Use</Text>
      </Text>

      {/* 📄 Subtitle */}
      <Text style={styles.subtext}>
        Analyze ingredients in your food and cosmetics to make safer choices for
        your health and wellness.
      </Text>

      {/* 🔵 Start Button */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="qr-code-outline" size={22} color="white" />
        <Text style={styles.buttonText}> Start Exploring</Text>
      </TouchableOpacity>

      {/* ➡ How it Works */}
      <TouchableOpacity>
        <Text style={styles.howItWorks}>HOW IT WORKS →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E90FF",
    letterSpacing: 2,
  },

  logoUnderline: {
    width: 40,
    height: 4,
    backgroundColor: "#1E90FF",
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    height: 260,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 25,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  badge: {
    position: "absolute",
    bottom: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 5,
  },

  badgeIcon: {
    backgroundColor: "#DFF5E1",
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  badgeText: {
    fontWeight: "600",
    color: "#2E7D32",
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
  },

  blue: {
    color: "#1E90FF",
  },

  subtext: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  howItWorks: {
    marginTop: 25,
    color: "#7A8CA5",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
