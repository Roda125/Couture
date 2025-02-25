import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";

export function RegistroScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const validateEmail = ({email}: { email: any }) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleRegister = () => {
        if (!validateEmail({email: email})) {
            setErrorMessage("Correo electrónico inválido");
            setVisible(true);
            return;
        }
        if (password.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres");
            setVisible(true);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            setVisible(true);
            return;
        }
        console.log("Registro exitoso:", email);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO</Text>
            <Image source={require("../../../../assets/user-icon.svg")} style={styles.image} />

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

            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
                disabled={!email || !password || !confirmPassword}
            >
                Registrarse
            </Button>

            <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={3000}>
                {errorMessage}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0B0B0",
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
    },
});

export default RegistroScreen;
