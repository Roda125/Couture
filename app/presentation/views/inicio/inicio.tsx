import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = [
    { name: "HOMBRE", image: require("../../../../assets/hombre.jpg"), screen: "HombreScreen" },
    { name: "MUJER", image: require("../../../../assets/mujer.png"), screen: "MujerScreen" },
    { name: "NIÑOS", image: require("../../../../assets/niños.jpg"), screen: "NiñosScreen" },
    { name: "ACCESORIOS", image: require("../../../../assets/accesorios.jpg"), screen: "AccesoriosScreen" },
];

const InicioScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>COUTURE</Text>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.categoryContainer}
                    onPress={() => navigation.navigate(category.screen)}
                >
                    <ImageBackground source={category.image} style={styles.imageBackground}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3D3D3",
        alignItems: "center",
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    categoryContainer: {
        width: "80%",
        height: "80%",
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
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
