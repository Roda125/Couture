import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamsList } from "../../interfaces/StackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../api/axiosInstance";

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError(validateEmail(text) ? "" : "Correo inválido.");
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError(text ? "" : "Contraseña obligatoria.");
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setEmailError(!email ? "Correo obligatorio." : "");
            setPasswordError(!password ? "Contraseña obligatoria." : "");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Correo inválido.");
            return;
        }

        try {
            const response = await axiosInstance.post("/users/login", {
                email,
                password,
            });

            const user = response.data;
            await AsyncStorage.setItem("user", JSON.stringify(user));

            Alert.alert("Bienvenido", `Hola, ${user.nombre}`);
            navigation.navigate("InicioScreen");
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            Alert.alert(
                "Error",
                error.response?.status === 401
                    ? "Credenciales incorrectas."
                    : "No se pudo conectar con el servidor."
            );
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("InicioScreen")}
            >
                <MaterialCommunityIcons name="home" size={28} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Iniciar sesión</Text>
            <Image
                source={require("../../../../assets/user-icon.svg")}
                style={styles.image}
            />

            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                error={!!emailError}
                style={styles.input}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                error={!!passwordError}
                style={styles.input}
            />
            {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                disabled={!email || !password || !!emailError || !!passwordError}
            >
                Iniciar sesión
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("RegistroScreen")}>
                <Text style={styles.register}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    homeButton: { position: "absolute", top: 40, left: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    image: { width: 80, height: 80, marginBottom: 20 },
    input: { width: "100%", marginBottom: 10 },
    button: { marginTop: 10, backgroundColor: "black" },
    register: { marginTop: 30, color: "black" },
    errorText: { color: "red", fontSize: 12, alignSelf: "flex-start" },
});

export default LoginScreen;
