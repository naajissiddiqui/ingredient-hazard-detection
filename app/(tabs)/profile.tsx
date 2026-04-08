// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   TextInput,
// } from "react-native";
// import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";

// interface ScanItem {
//   id: number;
//   product: string;
//   date: string;
// }

// export default function ProfileScreen() {
//   const [user, setUser] = useState({
//     name: "Munira",
//     email: "munira@email.com",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
//     totalScans: 125,
//     memberSince: "January 2024",
//   });

//   const [scanHistory] = useState<ScanItem[]>([
//     { id: 1, product: "Product A", date: "March 20, 2024" },
//     { id: 2, product: "Product B", date: "March 15, 2024" },
//     { id: 3, product: "Product C", date: "March 10, 2024" },
//   ]);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [editedName, setEditedName] = useState(user.name);
//   const [editedEmail, setEditedEmail] = useState(user.email);

//   const handleSave = () => {
//     setUser({
//       ...user,
//       name: editedName,
//       email: editedEmail,
//     });
//     setModalVisible(false);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         <Image source={{ uri: user.image }} style={styles.avatar} />

//         <Text style={styles.name}>{user.name}</Text>
//         <Text style={styles.email}>{user.email}</Text>

//         {/* Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statCard}>
//             <Text style={styles.statTitle}>Total Scans</Text>
//             <Text style={styles.statValue}>{scanHistory.length}</Text>
//           </View>

//           <View style={styles.statCard}>
//             <Text style={styles.statTitle}>Member Since</Text>
//             <Text style={styles.statValue}>{user.memberSince}</Text>
//           </View>
//         </View>

//         {/* Buttons */}
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.buttonText}>Edit Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutButton}>
//           <Text style={styles.buttonText}>Logout</Text>
//         </TouchableOpacity>

//         {/* Scan History */}
//         <View style={styles.historyContainer}>
//           <Text style={styles.historyTitle}>Scan History</Text>

//           {scanHistory.map((item) => (
//             <View key={item.id} style={styles.historyItem}>
//               <Text style={styles.productName}>{item.product}</Text>
//               <Text style={styles.scanDate}>
//                 Scanned on: {item.date}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* EDIT MODAL */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Profile</Text>

//             <TextInput
//               style={styles.input}
//               value={editedName}
//               onChangeText={setEditedName}
//               placeholder="Name"
//             />

//             <TextInput
//               style={styles.input}
//               value={editedEmail}
//               onChangeText={setEditedEmail}
//               placeholder="Email"
//               keyboardType="email-address"
//             />

//             <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//               <Text style={styles.buttonText}>Save Changes</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F6FA",
//   },
//   content: {
//     alignItems: "center",
//     paddingTop: 60,
//     paddingBottom: 40,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 65,
//     marginBottom: 15,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "600",
//   },
//   email: {
//     fontSize: 16,
//     color: "#777",
//     marginBottom: 25,
//   },

//   statsContainer: {
//     flexDirection: "row",
//     width: "90%",
//     justifyContent: "space-between",
//     marginBottom: 30,
//   },
//   statCard: {
//     backgroundColor: "#fff",
//     width: "48%",
//     padding: 20,
//     borderRadius: 12,
//     alignItems: "center",
//     elevation: 3,
//   },
//   statTitle: {
//     fontSize: 14,
//     color: "#777",
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   editButton: {
//     width: "85%",
//     backgroundColor: "#2F80ED",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   logoutButton: {
//     width: "85%",
//     backgroundColor: "#EB5757",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },

//   historyContainer: {
//     width: "90%",
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   historyItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   scanDate: {
//     fontSize: 13,
//     color: "#777",
//   },

//   /* Modal */
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     margin: 20,
//     padding: 20,
//     borderRadius: 12,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   saveButton: {
//     backgroundColor: "#2F80ED",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   cancelButton: {
//     backgroundColor: "#999",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
// });

/**
 * profile.tsx — Fixed version
 *
 * Fixes:
 *  1. Correct FormData (no manual Content-Type header — React Native sets it with boundary automatically)
 *  2. Reads prediction dict from /analyze-report and saves detected conditions to AsyncStorage
 *  3. Shows a results modal after upload with each detected condition
 *  4. Manual condition checklist persisted to AsyncStorage on every toggle
 *  5. Profile info (name, email) also saved to AsyncStorage
 */
import API_BASE_URL from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEYS = {
  conditions: "user_health_conditions",
  profile: "user_profile_info",
};
// ─── Condition definitions ────────────────────────────────────────────────────
const ALL_CONDITIONS = [
  {
    key: "diabetes",
    label: "Diabetes",
    icon: "🩸",
    desc: "Type 1, Type 2, pre-diabetes",
  },
  {
    key: "hypertension",
    label: "Hypertension",
    icon: "❤️",
    desc: "High blood pressure",
  },
  {
    key: "sensitive_skin",
    label: "Sensitive Skin",
    icon: "🌿",
    desc: "Eczema, dermatitis, rosacea",
  },
  {
    key: "hormonal_issues",
    label: "Hormonal Issues",
    icon: "⚗️",
    desc: "PCOS, thyroid, endocrine",
  },
  {
    key: "food_intolerance",
    label: "Food Intolerance",
    icon: "🌾",
    desc: "Lactose, gluten, IBS",
  },
  {
    key: "pregnancy",
    label: "Pregnancy",
    icon: "🤱",
    desc: "Currently pregnant",
  },
  {
    key: "kidney_disease",
    label: "Kidney Disease",
    icon: "🫘",
    desc: "CKD, renal insufficiency",
  },
  {
    key: "liver_disease",
    label: "Liver Disease",
    icon: "🟤",
    desc: "Hepatitis, NAFLD, cirrhosis",
  },
  {
    key: "heart_disease",
    label: "Heart Disease",
    icon: "💊",
    desc: "CAD, heart failure, post-MI",
  },
];
// ─── AsyncStorage helpers ─────────────────────────────────────────────────────
const persistConditions = async (conditions: string[]) => {
  try {
    await AsyncStorage.setItem(KEYS.conditions, JSON.stringify(conditions));
  } catch (e) {
    console.log("[Storage] saveConditions error:", e);
  }
};
const readConditions = async (): Promise<string[]> => {
  try {
    const val = await AsyncStorage.getItem(KEYS.conditions);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
};
const persistProfile = async (profile: { name: string; email: string }) => {
  try {
    await AsyncStorage.setItem(KEYS.profile, JSON.stringify(profile));
  } catch (e) {
    console.log("[Storage] saveProfile error:", e);
  }
};
const readProfile = async () => {
  try {
    const val = await AsyncStorage.getItem(KEYS.profile);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
};
// ─── Component ────────────────────────────────────────────────────────────────
interface ScanItem {
  id: number;
  product: string;
  date: string;
}
export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Munira",
    email: "munira@email.com",
    memberSince: "January 2024",
  });
  const [userImage] = useState(
    "[https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400](https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400)",
  );
  const [scanHistory] = useState<ScanItem[]>([
    { id: 1, product: "Product A", date: "March 20, 2024" },
    { id: 2, product: "Product B", date: "March 15, 2024" },
    { id: 3, product: "Product C", date: "March 10, 2024" },
  ]); // Conditions set
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [profileSaved, setProfileSaved] = useState(false); // Upload state
  const [uploading, setUploading] = useState(false); // Edit profile modal
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email); // Report result modal
  const [reportModal, setReportModal] = useState(false);
  const [reportDetected, setReportDetected] = useState<string[]>([]);
  const [reportOcrText, setReportOcrText] = useState("");
  const [reportAiUsed, setReportAiUsed] = useState(false); // ── Load stored data on mount ──────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const storedConditions = await readConditions();
      if (storedConditions.length > 0) setSelected(new Set(storedConditions));
      const storedProfile = await readProfile();
      if (storedProfile) {
        setUser((prev) => ({ ...prev, ...storedProfile }));
        setEditName(storedProfile.name ?? "");
        setEditEmail(storedProfile.email ?? "");
      }
    })();
  }, []); // ── Toggle condition ───────────────────────────────────────────────────────
  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      persistConditions(Array.from(next)); // save immediately on every change
      return next;
    });
    setProfileSaved(false);
  }; // ── Save health profile button ─────────────────────────────────────────────
  const saveHealthProfile = async () => {
    await persistConditions(Array.from(selected));
    setProfileSaved(true);
    Alert.alert(
      "Saved",
      selected.size === 0
        ? "No conditions set. Standard analysis will be used."
        : `${selected.size} condition(s) saved. Personalized analysis is now active.`,
    );
  }; // ── Save profile info ──────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    const updated = { ...user, name: editName, email: editEmail };
    setUser(updated);
    await persistProfile({ name: editName, email: editEmail });
    setEditModal(false);
  }; // ── Upload health report ───────────────────────────────────────────────────
  const uploadReport = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please allow photo library access to upload a report.",
      );
      return;
    }
    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.85,
    });
    if (picked.canceled || !picked.assets?.[0]) return;
    const asset = picked.assets[0];
    setUploading(true);
    try {
      // Build FormData — do NOT set Content-Type manually.
      // React Native's fetch sets it to multipart/form-data with the correct boundary.
      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri,
        name: asset.fileName ?? "report.jpg",
        type: asset.mimeType ?? "image/jpeg",
      } as any);
      const res = await fetch(`${API_BASE_URL}/analyze-report`, {
        method: "POST",
        body: formData, // ⚠️  No "Content-Type" header here — this is intentional
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      const data = await res.json(); // /analyze-report returns: { prediction: { condition: confidence }, extracted_text, ai_model_used }
      const prediction: Record<string, number> = data.prediction ?? {}; // Filter conditions above 0.45 confidence, exclude "none"
      const detected = Object.keys(prediction).filter(
        (k) => prediction[k] >= 0.45 && k !== "none",
      ); // Merge into existing selections
      setSelected((prev) => {
        const next = new Set(prev);
        detected.forEach((c) => next.add(c));
        persistConditions(Array.from(next));
        return next;
      });
      setProfileSaved(false);
      setReportDetected(detected);
      setReportOcrText(data.extracted_text ?? "");
      setReportAiUsed(data.ai_model_used ?? false);
      setReportModal(true);
    } catch (err: any) {
      console.error("[Upload]", err);
      Alert.alert(
        "Upload Failed",
        `Could not analyze the report.\n\nError: ${err?.message ?? "Unknown"}\n\nCheck that your backend is running at:\n${API_BASE_URL}`,
      );
    } finally {
      setUploading(false);
    }
  }; // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <ScrollView style={S.container}>
           
      <View style={S.content}>
                {/* Avatar + info */}
                <Image source={{ uri: userImage }} style={S.avatar} />       
        <Text style={S.name}>{user.name}</Text>       
        <Text style={S.email}>{user.email}</Text>        {/* Stats */}       
        <View style={S.statsRow}>
                   
          <View style={S.statCard}>
                        <Text style={S.statLabel}>Total Scans</Text>           
            <Text style={S.statVal}>{scanHistory.length}</Text>         
          </View>
                   
          <View style={S.statCard}>
                        <Text style={S.statLabel}>Member Since</Text>           
            <Text style={S.statVal}>{user.memberSince}</Text>         
          </View>
                 
        </View>
                {/* Action buttons */}       
        <TouchableOpacity
          style={[S.btn, { backgroundColor: "#2F80ED" }]}
          onPress={() => setEditModal(true)}
        >
                    <Text style={S.btnText}>Edit Profile</Text>       
        </TouchableOpacity>
               
        <TouchableOpacity style={[S.btn, { backgroundColor: "#EB5757" }]}>
                    <Text style={S.btnText}>Logout</Text>       
        </TouchableOpacity>
               
        <TouchableOpacity
          style={[
            S.btn,
            { backgroundColor: "#27AE60" },
            uploading && S.btnDisabled,
          ]}
          onPress={uploadReport}
          disabled={uploading}
        >
                   
          {uploading ? (
            <View style={S.row}>
                            <ActivityIndicator color="#fff" size="small" />     
                     
              <Text style={[S.btnText, { marginLeft: 10 }]}>
                Analyzing report...
              </Text>
                         
            </View>
          ) : (
            <Text style={S.btnText}>📋  Upload Health Report</Text>
          )}
                 
        </TouchableOpacity>
                {/* Health conditions checklist */}       
        <View style={S.section}>
                    <Text style={S.sectionTitle}>My Health Conditions</Text>   
               
          <Text style={S.sectionSub}>
                        Toggle your conditions. This personalizes ingredient
            risk scores for you.          
          </Text>
                   
          {ALL_CONDITIONS.map((c) => {
            const on = selected.has(c.key);
            return (
              <TouchableOpacity
                key={c.key}
                style={[S.condRow, on && S.condRowOn]}
                onPress={() => toggle(c.key)}
                activeOpacity={0.85}
              >
                               
                <View style={S.condLeft}>
                                    <Text style={S.condIcon}>{c.icon}</Text>   
                               
                  <View>
                                       
                    <Text style={S.condLabel}>{c.label}</Text>                 
                      <Text style={S.condDesc}>{c.desc}</Text>                 
                  </View>
                                 
                </View>
                               
                <Switch
                  value={on}
                  onValueChange={() => toggle(c.key)}
                  trackColor={{ false: "#ddd", true: "#27AE60" }}
                  thumbColor="#fff"
                />
                             
              </TouchableOpacity>
            );
          })}
                   
          <TouchableOpacity
            style={[S.saveHealthBtn, profileSaved && S.saveHealthBtnDone]}
            onPress={saveHealthProfile}
          >
                       
            <Text style={S.btnText}>
              {profileSaved ? "✓  Profile Saved" : "Save Health Profile"}
            </Text>
                     
          </TouchableOpacity>
                   
          {selected.size > 0 && (
            <Text style={S.activeNote}>
                            {selected.size} condition
              {selected.size > 1 ? "s" : ""} active — personalized analysis on  
                       
            </Text>
          )}
                 
        </View>
                {/* Scan history */}       
        <View style={S.section}>
                    <Text style={S.sectionTitle}>Scan History</Text>         
          {scanHistory.map((item) => (
            <View key={item.id} style={S.historyItem}>
                            <Text style={S.productName}>{item.product}</Text>   
                        <Text style={S.scanDate}>Scanned on: {item.date}</Text> 
                       
            </View>
          ))}
                 
        </View>
             
      </View>
            {/* ── EDIT PROFILE MODAL ── */}     
      <Modal visible={editModal} animationType="slide" transparent>
               
        <View style={S.overlay}>
                   
          <View style={S.modal}>
                        <Text style={S.modalTitle}>Edit Profile</Text>         
             
            <TextInput
              style={S.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Name"
            />
                       
            <TextInput
              style={S.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
                       
            <TouchableOpacity
              style={[S.btn, { backgroundColor: "#2F80ED", width: "100%" }]}
              onPress={handleSaveProfile}
            >
                            <Text style={S.btnText}>Save Changes</Text>         
               
            </TouchableOpacity>
                       
            <TouchableOpacity
              style={[
                S.btn,
                { backgroundColor: "#999", width: "100%", marginTop: 0 },
              ]}
              onPress={() => setEditModal(false)}
            >
                            <Text style={S.btnText}>Cancel</Text>           
            </TouchableOpacity>
                     
          </View>
                 
        </View>
             
      </Modal>
            {/* ── REPORT RESULTS MODAL ── */}     
      <Modal visible={reportModal} animationType="slide" transparent>
               
        <View style={S.overlay}>
                   
          <View style={S.modal}>
                        <Text style={S.modalTitle}>Report Analyzed ✅</Text>   
                   
            {reportDetected.length > 0 ? (
              <>
                               
                <Text style={S.reportInfo}>
                                    Detected {reportDetected.length} condition
                  {reportDetected.length > 1 ? "s" : ""}:                
                </Text>
                               
                {reportDetected.map((k) => {
                  const meta = ALL_CONDITIONS.find((x) => x.key === k);
                  return (
                    <View key={k} style={S.chip}>
                                           
                      <Text style={S.chipIcon}>{meta?.icon ?? "•"}</Text>       
                                   
                      <Text style={S.chipText}>{meta?.label ?? k}</Text>       
                                 
                    </View>
                  );
                })}
                               
                <Text style={S.reportNote}>
                                    Added to your checklist. Review and tap Save
                  Health Profile.                
                </Text>
                             
              </>
            ) : (
              <Text style={S.reportInfo}>
                                No conditions detected. You can add them
                manually via the checklist.              
              </Text>
            )}
                       
            {reportOcrText.length > 0 && (
              <View style={S.ocrBox}>
                                <Text style={S.ocrLabel}>Extracted text:</Text> 
                             
                <Text style={S.ocrText} numberOfLines={4}>
                  {reportOcrText}
                </Text>
                             
              </View>
            )}
                       
            <Text style={S.aiNote}>
                            Detection method:
              {reportAiUsed ? "AI Model" : "Keyword Matching"}           
            </Text>
                       
            <TouchableOpacity
              style={[S.btn, { backgroundColor: "#2F80ED", width: "100%" }]}
              onPress={() => setReportModal(false)}
            >
                            <Text style={S.btnText}>Done</Text>           
            </TouchableOpacity>
                     
          </View>
                 
        </View>
             
      </Modal>
         
    </ScrollView>
  );
}
// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  content: { alignItems: "center", paddingTop: 60, paddingBottom: 48 },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 130, height: 130, borderRadius: 65, marginBottom: 14 },
  name: { fontSize: 24, fontWeight: "600", color: "#1A1A2E" },
  email: { fontSize: 14, color: "#777", marginBottom: 24 },
  statsRow: { flexDirection: "row", width: "90%", gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  statLabel: { fontSize: 12, color: "#888" },
  statVal: { fontSize: 18, fontWeight: "700", color: "#1A1A2E", marginTop: 4 },
  btn: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  btnDisabled: { opacity: 0.7 },
  section: { width: "90%", marginBottom: 28 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  sectionSub: { fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 18 },
  condRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "transparent",
    elevation: 1,
  },
  condRowOn: { borderColor: "#27AE60", backgroundColor: "#F0FAF4" },
  condLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  condIcon: { fontSize: 22, marginRight: 12 },
  condLabel: { fontSize: 15, fontWeight: "600", color: "#1A1A2E" },
  condDesc: { fontSize: 12, color: "#888", marginTop: 2 },
  saveHealthBtn: {
    backgroundColor: "#1A1A2E",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  saveHealthBtnDone: { backgroundColor: "#27AE60" },
  activeNote: {
    fontSize: 12,
    color: "#27AE60",
    textAlign: "center",
    fontWeight: "600",
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productName: { fontSize: 15, fontWeight: "500", color: "#1A1A2E" },
  scanDate: { fontSize: 12, color: "#777", marginTop: 2 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modal: { backgroundColor: "#fff", margin: 24, padding: 24, borderRadius: 16 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 14,
  },
  reportInfo: { fontSize: 14, color: "#444", lineHeight: 20, marginBottom: 14 },
  reportNote: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 6,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FAF4",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#27AE60",
  },
  chipIcon: { fontSize: 18, marginRight: 8 },
  chipText: { fontSize: 14, color: "#1A5E30", fontWeight: "600" },
  ocrBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 6,
  },
  ocrLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ocrText: { fontSize: 12, color: "#555", lineHeight: 18 },
  aiNote: { fontSize: 11, color: "#bbb", textAlign: "right", marginBottom: 12 },
});
