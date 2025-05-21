import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useCarrito } from "./CarritoContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    InicioScreen: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "InicioScreen">;
};

const CarritoScreen: React.FC<Props> = ({ navigation }) => {
    const { carrito } = useCarrito();

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 Carrito</Text>

            {carrito.length === 0 ? (
                <Text style={styles.emptyText}>Tu carrito está vacío 😢</Text>
            ) : (
                <FlatList
                    data={carrito}
                    keyExtractor={(item, index) => `${item.id}-${item.talla}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.talla}>Talla: {item.talla}</Text>
                                <Text style={styles.price}>Precio: {item.precio}€</Text>
                                <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
                                <Text style={styles.subtotal}>
                                    Subtotal: {(item.precio * item.cantidad).toFixed(2)}€
                                </Text>
                            </View>
                        </View>
                    )}
                />
            )}

            <Text style={styles.total}>Total: {total.toFixed(2)}€</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => alert("Función de pago en desarrollo")}
                >
                    <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("InicioScreen")}
                >
                    <Text style={styles.buttonText}>Seguir Comprando</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#D9D9D9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        color: "#666",
    },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    talla: {
        fontSize: 14,
        color: "#666",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    cantidad: {
        fontSize: 14,
        color: "#333",
        marginTop: 5,
    },
    subtotal: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginTop: 5,
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CarritoScreen;
