import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import CustomIcon from '../components/CustomIcon'

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.log(email);
            Alert.alert("Hata", error.message);
            console.error("Giriş Hatası:", error);
        }
    };

    return (
        <View style={styles.container}>

            {/* İkon Bölgesi (2/6 oranında) */}
            <View style={styles.iconContainer}>
                <CustomIcon source={require('../../assets/person.png')} height={100} width={100} />
            </View>

            {/* Input ve Buton Alanı (3/6 oranında) */}
            <View style={styles.inputContainer}>
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="E-Mail"
                    height={40}
                    onChangeText={setEmail}
                    isPassword={false}
                />
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="password"
                    height={40}
                    onChangeText={setPassword}
                    isPassword={true}
                />
                <CustomButton
                    title="Giriş Yap"
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    textColor="black"
                    height={40}
                    onPress={handleLogin}
                />
                <CustomButton
                    title="Kayıt Ol"
                    backgroundColor="grey"
                    borderColor="grey"
                    textColor="black"
                    height={40}
                    onPress={() => navigation.navigate("SignupScreen")}
                />

            </View>

            <View style={styles.bottomSpace} />

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "space-between", 
        alignItems: "center", 
        width: "100%",
    },
    iconContainer: {
        flex: 2, 
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    inputContainer: {
        flex: 3, 
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    bottomSpace: {
        flex: 1, 
    }
})