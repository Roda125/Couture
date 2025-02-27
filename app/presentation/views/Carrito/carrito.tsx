import React from 'react';
import { View, Text } from 'react-native';

interface CarritoScreenProps {
    route: {
        params: {
            carrito: Array<{ id: number; nombre: string; precio: number }>;
        };
    };
}

const CarritoScreen: React.FC<CarritoScreenProps> = ({ route }) => {
    const { carrito } = route.params;

    return (
        <View>
            <Text>Productos en el carrito:</Text>
            {carrito.map(producto => (
                <Text key={producto.id}>{producto.nombre} - ${producto.precio}</Text>
            ))}
        </View>
    );
};

export default CarritoScreen;
