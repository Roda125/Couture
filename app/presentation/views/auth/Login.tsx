import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
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

            setSnackbarMessage("Inicio de sesión exitoso");
            setSnackbarVisible(true);

            setTimeout(() => {
                navigation.navigate("InicioScreen");
            }, 1000);
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

    const handleGuestAccess = () => {
        setSnackbarMessage("Accediste como invitado");
        setSnackbarVisible(true);

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

            <Button
                mode="outlined"
                onPress={handleGuestAccess}
                style={styles.guestButton}
                labelStyle={{ color: "black" }}
            >
                Acceder como invitado
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("RegistroScreen")}>
                <Text style={styles.register}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    label: "OK",
                    onPress: () => setSnackbarVisible(false),
                }}
                style={{ backgroundColor: "black" }}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: "black",
        width: "100%",
    },
    guestButton: {
        marginTop: 10,
        borderColor: "black",
        width: "100%",
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
});

export default LoginScreen;
