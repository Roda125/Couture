import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { useCarrito } from "./CarritoContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    InicioScreen: undefined;
    PagoScreen: undefined;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "InicioScreen">;
};

const CarritoScreen: React.FC<Props> = ({ navigation }) => {
    const { carrito, eliminarDelCarrito } = useCarrito();

    const parseNumber = (value: any): number => {
        if (typeof value === "string") {
            value = value.replace(",", ".").replace(/[^\d.]/g, "");
        }
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const total = carrito.reduce((sum, item) => {
        const precio = parseNumber(item.precio);
        const cantidad = parseNumber(item.cantidad);
        return sum + precio * cantidad;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 Carrito</Text>

            {carrito.length === 0 ? (
                <Text style={styles.emptyText}>Tu carrito está vacío 😢</Text>
            ) : (
                <FlatList
                    data={carrito}
                    keyExtractor={(item, index) => `${item.id}-${item.talla}-${index}`}
                    renderItem={({ item }) => {
                        const precio = parseNumber(item.precio);
                        const cantidad = parseNumber(item.cantidad);
                        return (
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.talla}>Talla: {item.talla}</Text>
                                    <Text style={styles.price}>Precio: {precio.toFixed(2)}€</Text>
                                    <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => eliminarDelCarrito(item.id, item.talla)}
                                >
                                    <Text style={styles.deleteButtonText}>❌</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            )}

            <Text style={styles.total}>Total: {total.toFixed(2)}€</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PagoScreen")}
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
    deleteButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    deleteButtonText: {
        fontSize: 20,
        color: "red",
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
