import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    CarritoScreen: { carrito: CarritoItem[] };
    InicioScreen: undefined;
};

type CarritoItem = {
    id: number;
    name: string;
    image: string;
    precio: number;
    talla: string;
};

type CarritoScreenNavigationProp = StackNavigationProp<RootStackParamList, "CarritoScreen">;
type CarritoScreenRouteProp = RouteProp<RootStackParamList, "CarritoScreen">;

type Props = {
    navigation: CarritoScreenNavigationProp;
    route: CarritoScreenRouteProp;
};

const CarritoScreen: React.FC<Props> = ({ route, navigation }) => {
    const { carrito } = route.params;

    // Calculamos el total del carrito
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 Carrito</Text>

            {carrito.length === 0 ? (
                <Text style={styles.emptyText}>Tu carrito está vacío 😢</Text>
            ) : (
                <FlatList
                    data={carrito}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.talla}>Talla: {item.talla}</Text>
                                <Text style={styles.price}>{item.precio}€</Text>
                            </View>
                        </View>
                    )}
                />
            )}

            <Text style={styles.total}>Total: {total.toFixed(2)}€</Text>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => alert("Función de pago en desarrollo")}>
                    <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InicioScreen")}>
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
