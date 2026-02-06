import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* IMAGE CARD */}
      <View style={styles.imageCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* CONTENT */}
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Empowering your choices{"\n"}
          <Text style={styles.titleBlue}>with science</Text>
        </Text>

        <Text style={styles.subtitle}>
          We believe that everyone has the right to know exactly what they are
          putting on their skin and in their bodies. Our mission is to transform
          complex chemical jargon into clear, actionable health insights.
        </Text>

        <Text style={styles.subtitle}>
          By bridging the gap between rigorous scientific research and daily
          consumer shopping, we provide a layer of safety that modern living
          demands.
        </Text>

        {/* AI CARD */}
        <View style={styles.card}>
          <Ionicons name="sparkles" size={30} color="#6B9AC4" />
          <Text style={styles.cardTitle}>AI-Driven Safety Engine</Text>

          <Text style={styles.cardText}>
            Our AI continuously scans thousands of research papers and global
            regulatory databases to provide accurate safety predictions.
          </Text>
        </View>

        {/* FEATURES */}
        <View style={styles.featureRow}>
          <Feature icon="shield-checkmark" title="Unbiased Ratings" text="Independent and based on clinical data." />
          <Feature icon="flash" title="Real-Time Results" text="Instant AI safety assessments." />
          <Feature icon="leaf" title="Eco-Conscious" text="Highlights harmful ingredients." />
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>DEVELOPED FOR PUBLIC HEALTH</Text>

          <View style={styles.footerIcons}>
            <Ionicons name="globe-outline" size={28} color="#6B7280" />
            <Ionicons name="mail-outline" size={28} color="#6B7280" />
            <Ionicons name="share-social-outline" size={28} color="#6B7280" />
          </View>

          <Text style={styles.version}>Version 1.0.0 (2025)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function Feature({ icon, title, text }: any) {
  return (
    <View style={styles.featureCard}>
      <Ionicons name={icon} size={32} color="#6B9AC4" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  imageCard: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
    width: "92%",
    maxWidth: 1000,
    borderRadius: 24,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 220,
  },

  wrapper: {
    maxWidth: 1100,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 40,
  },

  title: {
    fontSize: 64,
    textAlign: "center",
    fontWeight: "700",
    color: "#1F2A33",
    marginBottom: 20,
  },

  titleBlue: {
    color: "#6B9AC4",
  },

  subtitle: {
    textAlign: "center",
    color: "#4B5B66",
    fontSize: 22,
    lineHeight: 34,
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#EEF3F7",
    padding: 36,
    borderRadius: 22,
    marginTop: 40,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
  },

  cardText: {
    textAlign: "center",
    color: "#4B5B66",
    marginTop: 10,
    fontSize: 18,
  },

  featureRow: {
    flexDirection: "row",
    gap: 28,
    marginTop: 50,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  featureCard: {
    backgroundColor: "#F5F7FA",
    padding: 32,
    borderRadius: 22,
    width: 300,
    alignItems: "center",
  },

  featureTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  featureText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4B5B66",
    marginTop: 6,
  },

  footer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 60,
  },

  footerText: {
    color: "#9CA3AF",
    marginBottom: 14,
    fontSize: 16,
  },

  footerIcons: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 14,
  },

  version: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});
