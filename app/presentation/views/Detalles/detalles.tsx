import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    DetallePrendaScreen: { item: Prenda };
};

type Prenda = {
    id: number;
    name: string;
    description: string;
    image: string;
    precio: number;
    categoria: string;
};

type DetallePrendaScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "DetallePrendaScreen"
>;

type DetallePrendaScreenRouteProp = RouteProp<
    RootStackParamList,
    "DetallePrendaScreen"
>;

type Props = {
    navigation: DetallePrendaScreenNavigationProp;
    route: DetallePrendaScreenRouteProp;
};

const tallasDisponibles = ["S", "M", "L", "XL"];

const DetallePrendaScreen: React.FC<Props> = ({ route, navigation }) => {
    const { item } = route.params;
    const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {/* Botón para volver atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            {/* Botón para volver al inicio */}
            <TouchableOpacity onPress={() => navigation.navigate("InicioScreen")} style={styles.homeButton}>
                <Text style={styles.homeButtonText}>🏠 Inicio</Text>
            </TouchableOpacity>

            {/* Imagen y detalles de la prenda */}
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.precio}€</Text>

            {/* Selector de Talla */}
            <Text style={styles.tallaTitle}>Selecciona tu talla:</Text>
            <View style={styles.tallaContainer}>
                {tallasDisponibles.map((talla) => (
                    <TouchableOpacity
                        key={talla}
                        style={[
                            styles.tallaButton,
                            talla === tallaSeleccionada ? styles.tallaSeleccionada : null,
                        ]}
                        onPress={() => setTallaSeleccionada(talla)}
                    >
                        <Text style={styles.tallaText}>{talla}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Botón para añadir al carrito */}
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>
                    {tallaSeleccionada ? `Añadir Talla ${tallaSeleccionada} al carrito` : "Selecciona una talla"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
    },
    backButtonText: {
        fontSize: 18,
        color: "#007bff",
    },
    homeButton: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    homeButtonText: {
        fontSize: 18,
        color: "#007bff",
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginTop: 50,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginVertical: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    tallaTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
    },
    tallaContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    tallaButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#007bff",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    tallaSeleccionada: {
        backgroundColor: "#007bff",
    },
    tallaText: {
        fontSize: 16,
        color: "#007bff",
    },
    addToCartButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default DetallePrendaScreen;
