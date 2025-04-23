import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { PropsStackNavigation } from "../../interfaces/StackNav";

function RegisterScreen({ navigation }: PropsStackNavigation) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!email || !name || !password || !confirmPassword) {
            Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Email inválido", "Introduce un correo electrónico válido.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        const userData = {
            email,
            name,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el registro");
            }

            const data = await response.json();
            console.log("Usuario registrado:", data);
            Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión.");
            navigation.navigate("LoginScreen");

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            Alert.alert("Error", "No se pudo registrar el usuario. Verifica los datos o el servidor.");
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>REGISTRO</Text>

            <TextInput
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                label="Repetir Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Registrarme
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.registro}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    registro: {
        textAlign: "center",
        color: "black",
        marginTop: 30,
    },
    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0B0B0",
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
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
});

export default RegisterScreen;
