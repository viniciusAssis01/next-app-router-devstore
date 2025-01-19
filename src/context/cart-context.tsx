"use client";

import { createContext, useContext, useState } from "react";

interface ICartItem {
	productId: number;
	quantity: number;
}

interface ICartContext {
	items: ICartItem[];
	addToCart: (productId: number) => void;
}

interface ICartProviderProps {
	children: React.ReactNode;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
	const [cartItems, SetCartItems] = useState<ICartItem[]>([]);

	function addToCart(productId: number) {
		SetCartItems((state) => {
			const productInCart = state.some((item) => item.productId === productId);
			if (productInCart) {
				return state.map((item) => {
					if (item.productId === productId) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			} else {
				return [...state, { productId, quantity: 1 }];
			}
		});
	}

	return (
		<CartContext.Provider value={{ items: cartItems, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
