import React, { useState, useEffect } from "react";
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList,
    StyleSheet, ImageBackground, ActivityIndicator
} from "react-native";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const MujerScreen = ({ navigation }: PropsStackNavigation) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/ropa")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => alert("Error al obtener datos: " + error))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = data
        .filter(item => item.categoria?.toLowerCase() === "mujer")
        .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("InicioScreen")}>
                <Text style={styles.logo}>COUTURE</Text>
            </TouchableOpacity>

            <Text style={styles.title}>MUJER</Text>

            {/* Botón Cerrar Sesión */}
            <TouchableOpacity
                style={styles.userButton}
                onPress={() => navigation.navigate("LoginScreen")}
                activeOpacity={0.7}
            >
                <Image
                    source={require("../../../../assets/user-icon.svg")}
                    style={styles.userIcon}
                />
                <Text style={styles.userButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar"
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#666"
                />
                <Image source={require("../../../../assets/search-icon.svg")} style={styles.searchIcon} />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.productContainer}
                            onPress={() => navigation.navigate("DetallePrendaScreen", { item })}
                        >
                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                imageStyle={{ borderRadius: 10 }}
                            />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.precio}€</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate("CarritoScreen")}
                activeOpacity={0.7}
            >
                <Image
                    source={require("../../../../assets/cart-icon.svg")}
                    style={styles.cartIcon}
                />
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
    logo: {
        fontSize: 15,
        fontWeight: "bold",
        position: "absolute",
        left: -170,
        top: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#222",
    },
    userButton: {
        position: "absolute",
        top: 10,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 25,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        zIndex: 10,
    },
    userIcon: {
        width: 24,
        height: 24,
        tintColor: "white",
        marginRight: 8,
    },
    userButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.4,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: "90%",
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: "#000",
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: "gray",
    },
    productContainer: {
        flex: 1,
        alignItems: "center",
        margin: 5,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    productImage: {
        width: 150,
        height: 150,
        marginBottom: 5,
        borderRadius: 10,
    },
    productName: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#222",
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
    },
    cartButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 30,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    cartIcon: {
        width: 30,
        height: 30,
        tintColor: "black",
    },
});

export default MujerScreen;
