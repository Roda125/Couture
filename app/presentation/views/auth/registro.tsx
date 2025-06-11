import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Text,
    Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamsList } from "../../interfaces/StackNav";
import axiosInstance from "../api/axiosInstance";

const RegistroScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleRegister = async () => {
        let valid = true;
        const newErrors = { nombre: "", email: "", password: "", confirmPassword: "" };

        if (!nombre.trim()) {
            newErrors.nombre = "Nombre obligatorio.";
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Correo obligatorio.";
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = "Correo inválido.";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Contraseña obligatoria.";
            valid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        try {
            await axiosInstance.post("/users/registro", {
                nombre,
                email,
                password,
            });

            Alert.alert("Éxito", "Usuario registrado correctamente.");
            navigation.navigate("LoginScreen");
        } catch (error: any) {
            console.error("Error al registrar:", error);
            if (error.response?.status === 400) {
                Alert.alert("Error", "Datos inválidos o usuario ya existente.");
            } else {
                Alert.alert("Error", "No se pudo conectar con el servidor.");
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
                style={[styles.input, errors.nombre ? styles.inputError : null]}
            />
            {errors.nombre ? <Text style={styles.error}>{errors.nombre}</Text> : null}

            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email ? styles.inputError : null]}
            />
            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={[styles.input, errors.password ? styles.inputError : null]}
            />
            {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TextInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
                style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            />
            {errors.confirmPassword ? (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
                <Button title="Registrarse" onPress={handleRegister} color="black" />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flexGrow: 1, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    inputError: {
        borderColor: "red",
    },
    error: { color: "red", fontSize: 12, marginBottom: 5 },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 5,
        overflow: "hidden",
    },
    loginLink: { marginTop: 30, textAlign: "center", color: "black" },
});

export default RegistroScreen;
