import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import {PropsStackNavigation} from "../../interfaces/StackNav";

const InicioScreen = ({navigation, route}: PropsStackNavigation) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>COUTURE</Text>

            {/* Botón HOMBRE */}
            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => {navigation.navigate("HombreScreen")}}
            >
                <ImageBackground source={require("../../../../assets/hombre.jpg")} style={styles.imageBackground}>
                    <Text style={styles.categoryText}>HOMBRE</Text>
                </ImageBackground>
            </TouchableOpacity>

            {/* Botón MUJER */}
            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => {navigation.navigate("MujerScreen")}}
            >
                <ImageBackground source={require("../../../../assets/mujer.png")} style={styles.imageBackground}>
                    <Text style={styles.categoryText}>MUJER</Text>
                </ImageBackground>
            </TouchableOpacity>

            {/* Botón NIÑOS */}
            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => {navigation.navigate("NinosScreen")}}
            >
                <ImageBackground source={require("../../../../assets/niños.jpg")} style={styles.imageBackground}>
                    <Text style={styles.categoryText}>NIÑOS</Text>
                </ImageBackground>
            </TouchableOpacity>

            {/* Botón ACCESORIOS */}
            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => {navigation.navigate("AccesoriosScreen")}}
            >
                <ImageBackground source={require("../../../../assets/accesorios.jpg")} style={styles.imageBackground}>
                    <Text style={styles.categoryText}>ACCESORIOS</Text>
                </ImageBackground>
            </TouchableOpacity>

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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    categoryContainer: {
        width: "80%",
        height: "21%",
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 5,
        borderRadius: 5,
    },
});

export default InicioScreen;
