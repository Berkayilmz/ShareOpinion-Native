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
        // Kullanıcı oturum durumunu dinle
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("🔥 Kullanıcı giriş yaptı:", user.email);
                setUser(user);
            } else {
                console.log("🚪 Kullanıcı çıkış yaptı.");
                setUser(null);
                setNotes([]); // Kullanıcı çıkış yapınca notları temizle
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        // Kullanıcının notlarını çekmek için Firestore sorgusu (Mevcut veritabanı yapısına göre)
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
    }, [user]); // Kullanıcı değişirse notları yeniden çek

    // 🔥 Not Silme Fonksiyonu
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
            {user ? (
                <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>Hoşgeldiniz, {user.email}!</Text>

                    {/* Profil ve Not Ekleme Butonları */}
                    <CustomButton
                        title="Profil Bilgileri"
                        backgroundColor="red"
                        borderColor="darkred"
                        textColor="white"
                        height={40}
                        onPress={() => navigation.navigate("ProfileDetailScreen")}
                    />
                    <CustomButton
                        title="Not Ekle"
                        backgroundColor="blue"
                        borderColor="darkblue"
                        textColor="white"
                        height={40}
                        onPress={() => navigation.navigate("CreateNoteScreen")}
                    />

                    {/* Notları Listeleme Alanı */}
                    <Text style={styles.sectionTitle}>📌 Notlarınız:</Text>
                    <View style={styles.listContainer}>
                        {notes.length > 0 ? (
                            <FlatList
                                data={notes}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.noteItem}>
                                        {/* Not İçeriği */}
                                        <Text style={styles.noteText}>{item.text}</Text>
                                        
                                        {/* Sağ Tarafta Güncelle & Sil Butonları */}
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.updateButton}
                                                onPress={() => navigation.navigate("CreateNoteScreen", { noteId: item.id, text: item.text })}
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
                <View style={styles.buttonContainer}>
                    <Text style={styles.welcomeText}>Lütfen giriş yapın.</Text>
                    <CustomButton
                        title="Giriş Yap"
                        backgroundColor="lightgrey"
                        borderColor="grey"
                        textColor="black"
                        height={40}
                        onPress={() => navigation.navigate("LoginScreen")}
                    />
                    <CustomButton
                        title="Kayıt Ol"
                        backgroundColor="lightgrey"
                        borderColor="grey"
                        textColor="black"
                        height={40}
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        paddingTop: 20,
    },
    contentContainer: {
        width: "90%",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    listContainer: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
    },
    noteItem: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteText: {
        fontSize: 14,
        flex: 1, // Metin genişliği butonlara taşmasın
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 8,
    },
    updateButton: {
        backgroundColor: "#fbc02d",
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#d32f2f",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    noNotesText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
    },
});