import { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const CreateNoteScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { noteId, text } = route.params || {};

    const [note, setNote] = useState(""); 

    useEffect(() => {
        if (text) {
            setNote(text);
        }
    }, [text]);

    const saveNote = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Lütfen Giriş Yapın!");
            navigation.navigate("LoginScreen");
            return;
        }

        try {
            if (noteId) {
                const noteRef = doc(db, "notes", user.uid, "userNotes", noteId);
                await updateDoc(noteRef, { text: note });
                Alert.alert("Not Güncellendi!");
            } else {
                await addDoc(collection(db, "notes", user.uid, "userNotes"), {
                    text: note,
                    userId: user.uid,
                    createdAt: new Date(),
                });
                Alert.alert("Not Eklendi!");
            }

            setNote(""); 
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Not kaydedilirken hata oluştu: ", error);
            Alert.alert("Hata", "Not kaydedilemedi!");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Notunu yaz..."
                value={note}
                onChangeText={setNote}
                style={styles.input}
            />
            <Button title={noteId ? "Güncelle" : "Kaydet"} onPress={saveNote} />
        </View>
    );
};

export default CreateNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "90%",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5,
    },
});