import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useCarrito } from '../Carrito/CarritoContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamsList, 'PagoScreen'>;

const PagoScreen = () => {
    const { carrito } = useCarrito();
    const navigation = useNavigation<NavigationProp>();
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);

    const parseNumber = (value: any): number => {
        if (typeof value === 'string') {
            value = value.replace(',', '.').replace(/[^\d.]/g, '');
        }
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const total = carrito.reduce((sum, item) => {
        return sum + parseNumber(item.precio) * parseNumber(item.cantidad);
    }, 0);

    const handlePago = () => {
        if (!cardNumber || !expiry || !cvc) {
            Alert.alert('Faltan datos', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            if (cardNumber.endsWith('42')) {
                Alert.alert('Pago fallido', 'Hubo un problema con tu tarjeta');
            } else {
                Alert.alert('Pago exitoso 🎉', `Se ha cobrado ${total.toFixed(2)}€`);
            }
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('InicioScreen')}>
                <Text style={styles.homeIcon}>🏠</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Pagar {total.toFixed(2)}€</Text>

            <TextInput
                style={styles.input}
                placeholder="Número de tarjeta"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
                maxLength={19}
            />

            <TextInput
                style={styles.input}
                placeholder="Fecha de expiración (MM/AA)"
                value={expiry}
                onChangeText={setExpiry}
                maxLength={5}
            />

            <TextInput
                style={styles.input}
                placeholder="CVC"
                keyboardType="numeric"
                value={cvc}
                onChangeText={setCvc}
                maxLength={4}
            />

            <TouchableOpacity style={styles.button} onPress={handlePago} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Simular Pago</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        padding: 20,
        paddingTop: 50,
    },
    homeButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
    },
    homeIcon: {
        fontSize: 28,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PagoScreen;
