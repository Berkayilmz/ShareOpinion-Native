import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import CustomButton from "../components/CustomButton";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(auth.currentUser);
            } else {
                setUser(null);
                setNotes([]);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        const notesRef = collection(db, "notes", user.uid, "userNotes");
        const q = query(notesRef);

        const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
            let notesArray = [];
            querySnapshot.forEach((doc) => {
                notesArray.push({ id: doc.id, ...doc.data() });
            });
            setNotes(notesArray);
        });

        return () => unsubscribeFirestore();
    }, [user]);

    const deleteNote = async (noteId) => {
        Alert.alert("Notu Sil", "Bu notu silmek istediğinizden emin misiniz?", [
            { text: "İptal", style: "cancel" },
            {
                text: "Sil",
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "notes", user.uid, "userNotes", noteId));
                        Alert.alert("Başarılı", "Not başarıyla silindi.");
                    } catch (error) {
                        console.error("Silme hatası:", error);
                        Alert.alert("Hata", "Not silinemedi.");
                    }
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View style={styles.container}>
            {user && !user.emailVerified && (
                <Text style={styles.warningText}>⚠️ Eposta adresiniz onaylanmamış!</Text>
            )}

            {user ? (
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>Hoşgeldin, {user.displayName}!</Text>

                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Profil Bilgileri"
                            backgroundColor="#ff5c5c"
                            borderColor="#cc0000"
                            textColor="white"
                            height={45}
                            onPress={() => navigation.navigate("ProfileDetailScreen")}
                        />
                        <CustomButton
                            title="Not Ekle"
                            backgroundColor="#4caf50"
                            borderColor="#2e7d32"
                            textColor="white"
                            height={45}
                            onPress={() => {
                                if (!user.emailVerified) {
                                    Alert.alert("Lütfen eposta adresinizi onaylayın.");
                                    return;
                                }
                                navigation.navigate("CreateNoteScreen");
                            }}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>📌 Notlarınız:</Text>
                    <View style={styles.listContainer}>
                        {notes.length > 0 ? (
                            <FlatList
                                data={notes}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.noteItem}>
                                        <Text style={styles.noteText}>{item.text}</Text>
                                        <View style={styles.noteButtons}>
                                            <TouchableOpacity
                                                style={styles.updateButton}
                                                onPress={() =>
                                                    navigation.navigate("CreateNoteScreen", {
                                                        noteId: item.id,
                                                        text: item.text,
                                                    })
                                                }
                                            >
                                                <Text style={styles.buttonText}>Güncelle</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => deleteNote(item.id)}
                                            >
                                                <Text style={styles.buttonText}>Sil</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.noNotesText}>Henüz not eklenmedi.</Text>
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.authContainer}>
                    <Text style={styles.welcomeText}>Lütfen giriş yapın.</Text>
                    <CustomButton
                        title="Giriş Yap"
                        backgroundColor="#1976d2"
                        borderColor="#0d47a1"
                        textColor="white"
                        height={45}
                        onPress={() => navigation.navigate("LoginScreen")}
                    />
                    <CustomButton
                        title="Kayıt Ol"
                        backgroundColor="#757575"
                        borderColor="#424242"
                        textColor="white"
                        height={45}
                        onPress={() => navigation.navigate("SignupScreen")}
                    />
                </View>
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    contentContainer: {
        alignItems: "center",
        flex: 1,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    warningText: {
        color: "red",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    listContainer: {
        width: "100%",
        flex: 1,
    },
    noteItem: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteText: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    noteButtons: {
        flexDirection: "row",
        gap: 8,
    },
    updateButton: {
        backgroundColor: "#fbc02d",
        padding: 8,
        borderRadius: 6,
        marginLeft: 5,
    },
    deleteButton: {
        backgroundColor: "#e53935",
        padding: 8,
        borderRadius: 6,
        marginLeft: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    noNotesText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop: 20,
    },
    buttonWrapper: {
        width: "100%",
        gap: 10,
        marginBottom: 10,
    },
    authContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        marginTop: 50,
    },
});