import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CarritoItem = {
    id: number;
    name: string;
    image: string;
    precio: number;
    talla: string;
    cantidad: number;
};

type CarritoContextType = {
    carrito: CarritoItem[];
    agregarAlCarrito: (item: CarritoItem) => void;
    limpiarCarrito: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);

    useEffect(() => {
        const cargarCarrito = async () => {
            const data = await AsyncStorage.getItem("carrito");
            if (data) setCarrito(JSON.parse(data));
        };
        cargarCarrito();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (item: CarritoItem) => {
        setCarrito((prev) => {
            const existente = prev.find(
                (prod) => prod.id === item.id && prod.talla === item.talla
            );
            if (existente) {
                return prev.map((prod) =>
                    prod.id === item.id && prod.talla === item.talla
                        ? { ...prod, cantidad: prod.cantidad + item.cantidad }
                        : prod
                );
            } else {
                return [...prev, item];
            }
        });
    };

    const limpiarCarrito = () => setCarrito([]);

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, limpiarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    return context;
};
