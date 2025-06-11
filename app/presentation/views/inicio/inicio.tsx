import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const InicioScreen = ({ navigation, route }: any) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleCerrarSesion = () => {
        setSnackbarVisible(true);

        setTimeout(() => {
            setSnackbarVisible(false);
            navigation.navigate("LoginScreen");
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate("CarritoScreen")}
            >
                <MaterialCommunityIcons name="cart-outline" size={28} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.userButton} onPress={handleCerrarSesion}>
                <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.userButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            <Text style={styles.title}>COUTURE</Text>

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => navigation.navigate("HombreScreen")}
            >
                <ImageBackground
                    source={require("../../../../assets/hombre.jpg")}
                    style={styles.imageBackground}
                >
                    <Text style={styles.categoryText}>HOMBRE</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => navigation.navigate("MujerScreen")}
            >
                <ImageBackground
                    source={require("../../../../assets/mujer.png")}
                    style={styles.imageBackground}
                >
                    <Text style={styles.categoryText}>MUJER</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => navigation.navigate("NinosScreen")}
            >
                <ImageBackground
                    source={require("../../../../assets/niños.jpg")}
                    style={styles.imageBackground}
                >
                    <Text style={styles.categoryText}>NIÑOS</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => navigation.navigate("AccesoriosScreen")}
            >
                <ImageBackground
                    source={require("../../../../assets/accesorios.jpg")}
                    style={styles.imageBackground}
                >
                    <Text style={styles.categoryText}>ACCESORIOS</Text>
                </ImageBackground>
            </TouchableOpacity>

            {snackbarVisible && (
                <View style={styles.snackbar}>
                    <Text style={styles.snackbarText}>Sesión cerrada actualmente</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3D3D3",
        alignItems: "center",
        paddingTop: 50,
    },
    userButton: {
        position: "absolute",
        top: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222", // oscuro para contraste
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 30,
        elevation: 5, // sombra Android
        shadowColor: "#000", // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10,
    },
    userButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.5,
    },
    cartButton: {
        position: "absolute",
        top: 10,
        left: 10,
        padding: 10,
        zIndex: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        letterSpacing: 2,
        color: "#222",
    },
    categoryContainer: {
        width: "80%",
        height: "21%",
        marginBottom: 15,
        borderRadius: 15,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        backgroundColor: "#fff",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        color: "#000",
        fontSize: 22,
        fontWeight: "700",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        overflow: "hidden",
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

export default InicioScreen;
