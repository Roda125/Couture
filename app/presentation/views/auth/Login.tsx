import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamsList } from "../../interfaces/StackNav";

function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError(validateEmail(text) ? "" : "Por favor, ingresa un email válido.");
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError(text ? "" : "La contraseña es obligatoria.");
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setEmailError(!email ? "El email es obligatorio." : "");
            setPasswordError(!password ? "La contraseña es obligatoria." : "");
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Por favor, ingresa un email válido.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users");
            if (!response.ok) throw new Error("Usuario no encontrado");
            const user = await response.json();

            if (user.password !== password) {
                Alert.alert("Error", "Contraseña incorrecta.");
                return;
            }

            Alert.alert("Éxito", "Inicio de sesión exitoso.");
            navigation.navigate("InicioScreen");

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Alert.alert("Error", "Hubo un problema con la conexión o el usuario no existe.");
        }
    };

    const isFormValid = email && password && !emailError && !passwordError;

    return (
        <View style={styles.contenedor}>
            {/* Botón casita */}
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("InicioScreen")}
            >
                <MaterialCommunityIcons name="home" size={28} color="black" />
            </TouchableOpacity>

            <Text style={styles.titulo}>Inicia Sesión</Text>
            <Image source={require("../../../../assets/user-icon.svg")} style={styles.image} />

            <TextInput
                label="Correo Electrónico"
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
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <Button
                mode="contained"
                onPress={handleLogin}
                disabled={!isFormValid}
                style={[styles.button, !isFormValid && styles.disabledButton]}
            >
                Iniciar Sesión
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("RegistroScreen")}>
                <Text style={styles.registro}>¿Aún no tienes cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0B0B0",
        padding: 20,
    },
    homeButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: "black",
    },
    disabledButton: {
        backgroundColor: "#888",
    },
    registro: {
        color: "black",
        marginTop: 30,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        alignSelf: "flex-start",
        marginBottom: 8,
    },
});

export default LoginScreen;
