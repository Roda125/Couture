import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Producto = {
    id: string;
    name: string;
    precio: string;
    talla: string;
    image: string;
    cantidad: number;
};

type CarritoContextType = {
    carrito: Producto[];
    agregarAlCarrito: (producto: Producto) => void;
    eliminarDelCarrito: (id: string, talla: string) => void;
    limpiarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<Producto[]>([]);


    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const data = await AsyncStorage.getItem("carrito");
                if (data) {
                    setCarrito(JSON.parse(data));
                }
            } catch (error) {
                console.error("Error al cargar el carrito", error);
            }
        };
        cargarCarrito();
    }, []);


    useEffect(() => {
        const guardarCarrito = async () => {
            try {
                await AsyncStorage.setItem("carrito", JSON.stringify(carrito));
            } catch (error) {
                console.error("Error al guardar el carrito", error);
            }
        };
        guardarCarrito();
    }, [carrito]);

    const agregarAlCarrito = (producto: Producto) => {
        setCarrito((prev) => {
            const index = prev.findIndex(
                (item) => item.id === producto.id && item.talla === producto.talla
            );
            if (index !== -1) {
                const nuevo = [...prev];
                nuevo[index].cantidad += producto.cantidad;
                return nuevo;
            }
            return [...prev, producto];
        });
    };

    const eliminarDelCarrito = (id: string, talla: string) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id || item.talla !== talla));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
    }
    return context;
};
