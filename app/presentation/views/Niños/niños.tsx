import React, { useState, useEffect } from "react";
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList,
    StyleSheet, ImageBackground, ActivityIndicator
} from "react-native";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const HombreScreen = ({ navigation }: PropsStackNavigation) => {
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
        .filter(item => item.categoria?.toLowerCase() === "niño") //
        .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("InicioScreen")}>
                <Text style={styles.logo}>COUTURE</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Niños</Text>

            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate("LoginScreen")}>
                <Image source={require("../../../../assets/user-icon.svg")} style={styles.userIcon} />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar"
                    value={search}
                    onChangeText={setSearch}
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
                            onPress={() => navigation.navigate("DetallePrendaScreen", { item })} // 🔽 Enviar datos a la pantalla de detalles
                        >
                            <ImageBackground source={{ uri: item.image }} style={styles.productImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.precio}€</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("CarritoScreen")}>
                <Image source={require("../../../../assets/shopping_cart.png")} style={styles.cartIcon} />
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
    },
    userButton: {
        position: "absolute",
        top: 10,
        right: 20,
        padding: 10,
    },
    userIcon: {
        width: 30,
        height: 30,
        tintColor: "black",
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
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
    },
    cartButton: {
        position: "absolute",
        bottom: 20,
    },
    cartIcon: {
        width: 30,
        height: 30,
        tintColor: "black",
    },
});

export default HombreScreen;
