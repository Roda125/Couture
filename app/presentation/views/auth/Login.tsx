import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Text,
    Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamsList } from "../../interfaces/StackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../api/axiosInstance";

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Estado para mostrar mensaje estilo Snackbar
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError(validateEmail(text) ? "" : "Correo inválido.");
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError(text ? "" : "Contraseña obligatoria.");
    };

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
        setTimeout(() => {
            setSnackbarVisible(false);
        }, 3000);
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

            showSnackbar("Inicio de sesión exitoso");

            setTimeout(() => {
                navigation.navigate("InicioScreen");
            }, 1000);
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            alert(
                error.response?.status === 401
                    ? "Credenciales incorrectas."
                    : "No se pudo conectar con el servidor."
            );
        }
    };

    const handleGuestAccess = () => {
        showSnackbar("Accediste como invitado");

        setTimeout(() => {
            navigation.navigate("InicioScreen");
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Image
                source={require("../../../../assets/user-icon.svg")}
                style={styles.image}
            />

            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                style={[styles.input, emailError ? styles.inputError : null]}
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                style={[styles.input, passwordError ? styles.inputError : null]}
            />
            {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity
                onPress={handleLogin}
                style={[
                    styles.button,
                    !email || !password || emailError || passwordError
                        ? styles.buttonDisabled
                        : null,
                ]}
                disabled={!email || !password || !!emailError || !!passwordError}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGuestAccess} style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Acceder como invitado</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RegistroScreen")}>
                <Text style={styles.register}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>

            {/* Snackbar simple */}
            {snackbarVisible && (
                <View style={styles.snackbar}>
                    <Text style={styles.snackbarText}>{snackbarMessage}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
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
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    inputError: {
        borderColor: "red",
    },
    button: {
        marginTop: 10,
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#666",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    guestButton: {
        marginTop: 10,
        borderColor: "black",
        width: "100%",
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
    },
    guestButtonText: {
        color: "black",
    },
    register: {
        marginTop: 30,
        color: "black",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        alignSelf: "flex-start",
    },
    snackbar: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    snackbarText: {
        color: "white",
    },
});

export default LoginScreen;
